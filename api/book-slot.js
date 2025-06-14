export default async function handler(req, res) {
  // ✅ Abilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Gestione richiesta OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const { name, email, brand } = req.body;

    const bookingData = {
      name,
      email,
      brand,
      timestamp: new Date().toISOString()
    };

    // ✅ Sostituisci con il TUO URL Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzH6iPZypwGW-WDpfZTa7QctEx10ae1-5_6SL_DnZLgFKVFLdKxBgVg64kCLsz7BhwfIA/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    const text = await response.text();

    res.status(200).send(`Prenotazione ricevuta! Risposta da Google Sheet: ${text}`);
  } catch (error) {
    console.error("Errore durante la prenotazione:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
}