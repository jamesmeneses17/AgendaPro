import React, { useState } from 'react';
import CalendarSidebar from './calendarSidebar';

function Sidebar({
  isOpen,
  toggleSidebar,
  onLogout,
  setSelectedDate,
  setView,
  workWeekRange,
  fullWeekRange,
  currentView,
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout(); // Delegamos la lógica de la notificación al App.jsx
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div>
      {!isOpen && (
        <button onClick={toggleSidebar} className="p-2 bg-white">
          <span className="material-icons text-blue-600">menu</span>
        </button>
      )}
      <div
        className={`fixed top-16 left-0 h-[calc(100%-3rem)] w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <button onClick={toggleSidebar} className="p-2">
          <span className="material-icons text-blue-600">close</span>
        </button>
        <div className="p-4">
          <h2 className="font-semibold text-lg">Calendario</h2>
          <CalendarSidebar
            setSelectedDate={setSelectedDate}
            workWeekRange={currentView === 'workWeek' ? workWeekRange : null}
            fullWeekRange={currentView === 'week' ? fullWeekRange : null}
            view={currentView}
            setView={setView} // Pasar la función para actualizar la vista
          />
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-lg mb-4">¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="flex space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Sí
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
