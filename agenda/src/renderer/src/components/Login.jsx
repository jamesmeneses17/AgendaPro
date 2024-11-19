import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSwitchMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        onLogin(true, 'Cuenta creada exitosamente. Inicia sesion'); // Notificación de éxito
        setEmail('');
        setPassword('');
        setName('');
      } catch (error) {
        onLogin(false, 'Error al crear la cuenta. Intenta de nuevo.'); // Notificación de error
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin(true, 'Inicio de sesión exitoso.'); // Notificación de éxito
      } catch (error) {
        onLogin(false, 'Error al iniciar sesión. .'); // Notificación de error
      }
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      <div className="flex flex-1 items-center justify-center mt-10">
        <div className="relative bg-white rounded-lg shadow-lg flex overflow-hidden w-3/4 max-w-4xl">
          <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-bold mb-4">
              {isRegistering
                ? 'Únete a nuestro Calendario'
                : 'Bienvenido al Calendario'}
            </h2>
            <button
              onClick={handleSwitchMode}
              className="bg-white text-blue-500 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </div>

          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">
              {isRegistering ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </h2>
            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              >
                {isRegistering ? 'Registrar' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
