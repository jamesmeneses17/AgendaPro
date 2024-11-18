// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCOo2Fyp6sASlQUegSzP4T04htQ2r11JjE",
    authDomain: "agendapro-959aa.firebaseapp.com",
    projectId: "agendapro-959aa",
    storageBucket: "agendapro-959aa.firebasestorage.app",
    messagingSenderId: "105198871437",
    appId: "1:105198871437:web:13fee0a6214e879b77d3c4",
    measurementId: "G-BM4154SKQS"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la autenticación para usarla en toda la app
export const auth = getAuth(app);
