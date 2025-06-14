export default async function handler(req, res) {
  // ✅ Abilita CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  try {
    const scriptURL = "https://script.google.com/macros/s/AKfycbzH6iPZypwGW-WDpfZTa7QctEx10ae1-5_6SL_DnZLgFKVFLdKxBgVg64kCLsz7BhwfIA/exec";

    const response = await fetch(scriptURL);
    const bookings = await response.json();

    // ✅ Se vuoi, puoi filtrare qui (es: solo per calendario "parasite-acid")
    // const filtered = bookings.filter(b => b.calendar === "parasite-acid");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Errore nel recupero slot:", error);
    res.status(500).json({ error: "Errore durante il recupero degli slot" });
  }
}