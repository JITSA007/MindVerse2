import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Find these in your Firebase Project Settings > General > Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyDHUZnkBBozukGIrM8pmKRAI3a9prCk0r0",
  authDomain: "mindverse2-3d71c.firebaseapp.com",
  projectId: "mindverse2-3d71c",
  storageBucket: "mindverse2-3d71c.firebasestorage.app",
  messagingSenderId: "985751375204",
  appId: "1:985751375204:web:65b45c929df4c315cbbe71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);