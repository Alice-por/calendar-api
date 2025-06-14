// api/book-slot.js
import db from "../firebase/firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
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
      calendar,
    } = req.body;

    if (!date || !time || !name || !email || !brand || !calendar) {
      return res.status(400).json({ error: "Dati mancanti" });
    }

    const bookingRef = db.ref(`bookings/${calendar}/${date}/${time}`);

    const snapshot = await bookingRef.once("value");

    if (snapshot.exists()) {
      return res.status(409).json({ error: "Slot già prenotato" });
    }

    await bookingRef.set({
      name,
      email,
      shop: shop || "",
      brand,
      zone: zone || "",
      timestamp: Date.now()
    });

    res.status(200).json({ success: true, message: "Prenotazione salvata con successo" });
  } catch (error) {
    console.error("Errore Firebase:", error);
    res.status(500).json({ error: "Errore interno del server Firebase" });
  }
}