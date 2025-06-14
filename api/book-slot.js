export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const {
      date,
      time,
      name,
      email,
      shop,
      brand,
      zone,
      calendar
    } = req.body;

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzH6iPZypwGW-WDpfZTa7QctEx10ae1-5_6SL_DnZLgFKVFLdKxBgVg64kCLsz7BhwfIA/exec',
      {
        method: 'POST',
        body: JSON.stringify({
          date,
          time,
          name,
          email,
          shop,
          brand,
          zone,
          calendar
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = await response.json();

    if (result.success) {
      res.status(200).json({ message: 'Prenotazione salvata con successo!' });
    } else {
      res.status(500).json({ error: 'Errore nella risposta di Google Sheets' });
    }

  } catch (error) {
    console.error('Errore durante la prenotazione:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}