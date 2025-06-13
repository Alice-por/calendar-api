import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { calendar, zone, date, time, name, email, shop } = req.body;

  if (!calendar || !zone || !date || !time || !name || !email || !shop) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }

  const calendarPath = path.join(process.cwd(), 'data', `${calendar}.json`);

  try {
    const calendarData = JSON.parse(fs.readFileSync(calendarPath, 'utf-8'));

    // Verifica se lo slot è disponibile
    if (
      !calendarData[date] ||
      !calendarData[date][time] ||
      calendarData[date][time][zone] !== 'available'
    ) {
      return res.status(409).json({ error: 'Slot non disponibile' });
    }

    // Marca lo slot come prenotato
    calendarData[date][time][zone] = 'booked';
    fs.writeFileSync(calendarPath, JSON.stringify(calendarData, null, 2));

    // Salva i dettagli della prenotazione in un file log
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    let bookings = [];
    if (fs.existsSync(bookingsPath)) {
      bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf-8'));
    }
    bookings.push({ calendar, zone, date, time, name, email, shop, timestamp: new Date().toISOString() });
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    res.status(200).json({ success: true, message: 'Prenotazione completata' });
  } catch (error) {
    console.error('Errore durante la prenotazione:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}