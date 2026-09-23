import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

import { blogPosts } from "../src/data/blog.js";
import { projects } from "../src/data/projects.js";
import { journey } from "../src/data/journey.js";
import { experience } from "../src/data/experience.js";
import { skills } from "../src/data/skills.js";
import { education } from "../src/data/education.js";
import { speakingEngagements } from "../src/data/speaking.js";

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

async function seedCollection(colName, items, idKey = "id") {
  console.log(`\n⏳ Seeding collection: '${colName}' (${items.length} items)...`);
  const colRef = collection(db, colName);
  
  // Optional check if collection already has documents
  const existingDocs = await getDocs(colRef);
  console.log(`ℹ️ Current documents in '${colName}': ${existingDocs.size}`);

  let count = 0;
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    // Sanitize doc ID
    const rawKey = item[idKey] ? String(item[idKey]) : `${index + 1}`;
    const safeKey = rawKey.replace(/[^a-zA-Z0-9_-]/g, "_");
    const docId = `${colName.slice(0, 3)}_${safeKey}`;
    const docRef = doc(db, colName, docId);
    
    // Add order / index metadata for clean sorting
    const payload = {
      ...item,
      order: item.order !== undefined ? item.order : index,
      seededAt: new Date().toISOString()
    };
    
    await setDoc(docRef, payload, { merge: true });
    count++;
  }
  console.log(`✅ Successfully seeded ${count} documents into '${colName}'.`);
}

async function runSeed() {
  console.log("🚀 Starting Firestore Seeding for George's Portfolio...");
  console.log(`📦 Project ID: ${firebaseConfig.projectId}`);

  try {
    // 1. Blogs
    await seedCollection("blogs", blogPosts);

    // 2. Projects
    await seedCollection("projects", projects);

    // 3. Tech Journey
    await seedCollection("journey", journey);

    // 4. Work Experience
    await seedCollection("experience", experience);

    // 5. Technical Skills
    await seedCollection("skills", skills, "category");

    // 6. Education
    await seedCollection("education", education);

    // 7. Public Speaking
    await seedCollection("speaking", speakingEngagements);

    console.log("\n🎉 ALL COLLECTIONS SEEDED SUCCESSFULLY TO FIRESTORE!\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed with error:", error);
    process.exit(1);
  }
}

runSeed();
