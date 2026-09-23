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

const COLLECTIONS = ["blogs", "projects", "speaking", "journey", "experience", "skills", "education"];

async function migrateCollectionToAutoIds(colName) {
  console.log(`\n🔄 Migrating collection '${colName}'...`);
  const colRef = collection(db, colName);
  const snapshot = await getDocs(colRef);

  if (snapshot.empty) {
    console.log(`ℹ️ Collection '${colName}' is empty.`);
    return;
  }

  let migratedCount = 0;
  for (const docSnap of snapshot.docs) {
    const oldId = docSnap.id;
    const data = docSnap.data();

    // Check if it's already a standard 20-character auto ID (does not have prefix like blo_, pro_, etc.)
    const isLegacyId = oldId.includes("_") || !isNaN(Number(oldId)) || oldId.length < 15;

    if (isLegacyId) {
      // Create a fresh 20-character auto ID
      const newDocRef = doc(colRef);
      const newId = newDocRef.id;

      // Clean payload: remove old legacy numerical id field if preferred, but preserve order & data
      const payload = {
        ...data,
        updatedAt: new Date().toISOString()
      };

      // Write to new auto-generated ID
      await setDoc(newDocRef, payload);

      // Delete the old legacy document
      await deleteDoc(doc(db, colName, oldId));

      console.log(`  ✓ Migrated: [${oldId}] ➔ [${newId}] (${data.title || data.degree || data.role || data.category || 'item'})`);
      migratedCount++;
    } else {
      console.log(`  - Skipping [${oldId}] (already standard auto ID)`);
    }
  }

  console.log(`✅ Migrated ${migratedCount} documents in '${colName}'.`);
}

async function runMigration() {
  console.log("🚀 Starting Firestore Migration to Standard Firebase Auto IDs...");
  console.log(`📦 Project: ${firebaseConfig.projectId}`);

  try {
    for (const colName of COLLECTIONS) {
      await migrateCollectionToAutoIds(colName);
    }
    console.log("\n🎉 ALL COLLECTIONS SUCCESSFULLY MIGRATED TO FIREBASE AUTO IDs!\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed with error:", error);
    process.exit(1);
  }
}

runMigration();
