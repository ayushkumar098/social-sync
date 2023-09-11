// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "status-sync-cc2c9.firebaseapp.com",
  projectId: "status-sync-cc2c9",
  storageBucket: "status-sync-cc2c9.appspot.com",
  messagingSenderId: "193120679138",
  appId: "1:193120679138:web:4fdf398980dde5975edabb",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
