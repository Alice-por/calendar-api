// firebase/firebase.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

const serviceAccountPath = path.join(process.cwd(), "firebase", "service-account.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://booking-calendar-silmo2025-default-rtdb.europe-west1.firebasedatabase.app/" // <-- DA CAMBIARE
  });
}

const db = admin.database();
export default db;