import db from '../utils/firebase';

export default async function handler(req, res) {
  try {
    const snapshot = await db.ref('bookings').once('value');
    const bookings = snapshot.val() || {};

    const result = Object.values(bookings); // array di tutte le prenotazioni
    res.status(200).json(result);
  } catch (error) {
    console.error('Errore fetch:', error);
    res.status(500).json({ error: 'Errore durante il recupero degli slot' });
  }
}