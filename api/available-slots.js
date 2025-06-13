import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { calendar, zone } = req.query;

  if (!calendar || !zone) {
    return res.status(400).json({ error: 'calendar e zone sono obbligatori' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', `${calendar}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const calendarData = JSON.parse(fileContent);

    const availableSlots = [];

    for (const [date, slots] of Object.entries(calendarData)) {
      for (const [time, zones] of Object.entries(slots)) {
        if (zones[zone] === 'available') {
          availableSlots.push({ date, time });
        }
      }
    }

    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error('Errore nella lettura del calendario:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}