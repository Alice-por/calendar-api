import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync('firebase/serviceAccountKey.json', 'utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://calendar-booking-a11d4-default-rtdb.europe-west1.firebasedatabase.app/', // Sostituisci con il tuo
  });
}

const db = admin.database();

export default db;