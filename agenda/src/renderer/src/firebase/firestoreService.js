// src/services/firestoreService.js
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Función para guardar un evento en Firestore
export const saveEventToFirestore = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "events"), eventData);
    console.log("Evento guardado con ID:", docRef.id);
    return docRef.id; // Retorna el ID del documento creado
  } catch (error) {
    console.error("Error al guardar el evento:", error);
    throw error;
  }
};

// Función para obtener todos los eventos de Firestore
export const fetchEventsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events; // Retorna un arreglo con los eventos
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    throw error;
  }
};
