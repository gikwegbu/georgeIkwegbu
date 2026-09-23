import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCQtFifMiH9JL1gPBhrOQorB5u-J_R7VTE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "georgeikwegbu.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "georgeikwegbu",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "georgeikwegbu.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "195116749081",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:195116749081:web:c7c358976166b8fe5e3588",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V8KSLP9VVX"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics conditionally (only in browser environments where supported)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Ignore analytics init failure in non-browser/unsupported contexts
  });
}

export { analytics };
export default app;
