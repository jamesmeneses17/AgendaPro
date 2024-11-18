import React, { useState } from 'react';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre registro e inicio de sesión
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Campo para el nombre en el registro

  const handleSwitchMode = () => {
    setIsRegistering(!isRegistering); // Cambia entre iniciar sesión y registrarse
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica de autenticación o registro
    onLogin(true); // Simula un inicio de sesión exitoso
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      {/* Controles de ventana */}
      <div className="absolute top-0 left-0 right-0 bg-blue-500 h-8 flex items-center justify-between px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-white text-sm font-bold">AgendaPro</div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-1 items-center justify-center mt-10">
        <div className="relative bg-white rounded-lg shadow-lg flex overflow-hidden w-3/4 max-w-4xl">
          {/* Sección izquierda */}
          <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-bold mb-4">
              {isRegistering
                ? 'Únete a nuestro Calendario'
                : 'Bienvenido al Calendario'}
            </h2>
            <p className="text-sm mb-8">
              {isRegistering
                ? 'Regístrate para organizar tus eventos y tareas fácilmente.'
                : 'Administra tus tareas y eventos de manera eficiente.'}
            </p>
            <button
              onClick={handleSwitchMode}
              className="bg-white text-blue-500 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </div>

          {/* Sección derecha */}
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
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">O usa tu cuenta</p>
              <div className="flex justify-center space-x-4 mt-2">
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                  F
                </button>
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                  G
                </button>
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                  T
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
