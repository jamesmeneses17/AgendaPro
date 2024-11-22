// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Agregando Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCOo2Fyp6sASlQUegSzP4T04htQ2r11JjE",
  authDomain: "agendapro-959aa.firebaseapp.com",
  projectId: "agendapro-959",
  projectId: "agendapro-959aa",
  storageBucket: "agendapro-959aa.appspot.com", // Corregido "firebasestorage.app" por "appspot.com"
  messagingSenderId: "105198871437",
  appId: "1:105198871437:web:13fee0a6214e879b77d3c4",
  measurementId: "G-BM4154SKQS",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás en toda la app
export const auth = getAuth(app); // Servicio de autenticación
export const db = getFirestore(app); // Servicio de Firestore
