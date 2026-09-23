import {
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./config";

/**
 * Fetch all documents from a Firestore collection.
 * Automatically tries to order by a sort field if present, with fallback.
 */
export async function getCollectionDocs(collectionName, sortField = "order", sortDirection = "asc") {
  try {
    const colRef = collection(db, collectionName);
    let q;
    try {
      q = query(colRef, orderBy(sortField, sortDirection));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
      }
    } catch {
      // If index/order field fails or document doesn't have sortField, fallback to un-ordered getDocs
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    }
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
  } catch (error) {
    console.warn(`Error fetching ${collectionName} from Firestore:`, error);
    throw error;
  }
}

/**
 * Add a new document to a collection with auto-generated ID.
 */
export async function addCollectionDoc(collectionName, data) {
  const colRef = collection(db, collectionName);
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  const docRef = await addDoc(colRef, payload);
  return { id: docRef.id, ...payload };
}

/**
 * Set a document with a specific custom ID (creates or overwrites/merges).
 */
export async function setCollectionDoc(collectionName, docId, data, merge = true) {
  const docRef = doc(db, collectionName, docId);
  const payload = {
    ...data,
    updatedAt: serverTimestamp()
  };
  await setDoc(docRef, payload, { merge });
  return { id: docId, ...payload };
}

/**
 * Update an existing document in a collection.
 */
export async function updateCollectionDoc(collectionName, docId, data) {
  const docRef = doc(db, collectionName, docId);
  const payload = {
    ...data,
    updatedAt: serverTimestamp()
  };
  await updateDoc(docRef, payload);
  return { id: docId, ...payload };
}

/**
 * Generate a standard 20-character Firestore auto ID locally.
 */
export function generateDocId(collectionName) {
  return doc(collection(db, collectionName)).id;
}

/**
 * Delete a document from a collection.
 */
export async function deleteCollectionDoc(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
  return docId;
}
