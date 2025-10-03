// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Твої ключі з Firebase Console -> Project Settings -> SDK setup
const firebaseConfig = {

  apiKey: "AIzaSyBbSW4rQjgQ1N7fs9mTZtBl3dZnYypAZ_E",

  authDomain: "meeting-room-booking-57562.firebaseapp.com",

  projectId: "meeting-room-booking-57562",

  storageBucket: "meeting-room-booking-57562.firebasestorage.app",

  messagingSenderId: "602392576479",

  appId: "1:602392576479:web:d2a9926faff901416dc46a",

  measurementId: "G-TEXNNM3CRT"

};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
