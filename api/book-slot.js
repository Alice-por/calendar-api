import db from '../utils/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo POST ammesso' });
  }

  try {
    const data = req.body;
    const ref = db.ref('bookings').push(); // crea un nuovo ID
    await ref.set(data);

    res.status(200).json({ success: true, message: 'Prenotazione salvata' });
  } catch (error) {
    console.error('Errore prenotazione:', error);
    res.status(500).json({ error: 'Errore interno server' });
  }
}