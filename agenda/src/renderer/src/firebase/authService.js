import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Importa la configuración de Firebase

export const registerUser = async (email, password, name) => {
  try {
    // Crea el usuario con email y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualiza el perfil del usuario para incluir el nombre
    await updateProfile(user, { displayName: name });

    console.log('Usuario registrado:', user);
    return user;
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
