"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATGKWX8LZqDG5cRF_ksdPAbBfxsqdaUHc",
  authDomain: "fionat-service.firebaseapp.com",
  projectId: "fionat-service",
  storageBucket: "fionat-service.firebasestorage.app",
  messagingSenderId: "287118942507",
  appId: "1:287118942507:web:9aa5c12b348344acc9a56e",
  measurementId: "G-HSS8LVHVKM",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const publicDb = getFirestore(app);
export const storage = getStorage(app);
