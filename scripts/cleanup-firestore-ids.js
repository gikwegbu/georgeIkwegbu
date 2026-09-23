import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCQtFifMiH9JL1gPBhrOQorB5u-J_R7VTE",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "georgeikwegbu.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "georgeikwegbu",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "georgeikwegbu.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "195116749081",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:195116749081:web:c7c358976166b8fe5e3588",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V8KSLP9VVX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTIONS = ["blogs", "projects", "journey", "experience", "skills", "education"];

async function cleanCollection(colName) {
  console.log(`\n🧹 Cleaning collection '${colName}'...`);
  const colRef = collection(db, colName);
  const snapshot = await getDocs(colRef);

  for (const docSnap of snapshot.docs) {
    const docId = docSnap.id;
    const data = docSnap.data();

    // If the doc ID itself is a legacy number or short prefix (e.g. "1", "2", "pro_1")
    const isLegacyDocId = docId.includes("_") || !isNaN(Number(docId)) || docId.length < 15;

    if (isLegacyDocId) {
      console.log(`  🗑️ Deleting legacy doc ID: [${docId}]`);
      await deleteDoc(doc(db, colName, docId));
      continue;
    }

    // If the document contains an internal numerical 'id' field, remove it
    if (data.id !== undefined) {
      console.log(`  ✨ Removing internal numerical 'id' property from document [${docId}] (was: ${data.id})`);
      const cleanedData = { ...data };
      delete cleanedData.id;
      await setDoc(doc(db, colName, docId), cleanedData);
    }
  }
  console.log(`✅ Collection '${colName}' cleaned.`);
}

async function runCleanup() {
  console.log("🚀 Cleaning up Firestore ID fields and legacy documents...");
  try {
    for (const colName of COLLECTIONS) {
      await cleanCollection(colName);
    }
    console.log("\n🎉 ALL FIRESTORE DOCUMENTS CLEANED!\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Cleanup failed:", err);
    process.exit(1);
  }
}

runCleanup();
