// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Нові дані конфігурації Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkaUrtA1h2Lx2WF1aGM6vHWInuydwG18A",
  authDomain: "kiril-84a7b.firebaseapp.com",
  projectId: "kiril-84a7b",
  storageBucket: "kiril-84a7b.appspot.com",
  messagingSenderId: "1099040075037",
  appId: "1:1099040075037:web:d64a411ba70573f89b85f4",
  measurementId: "G-SW0HPTYH0B"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація сервісів
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app); // ⬅ додай цю строчку

