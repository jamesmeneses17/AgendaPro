import React from 'react';
import specialImage from '../assets/images/calendario.png'; // Ruta de la imagen

function DayDetailsSidebar({ selectedDate, onClose }) {
  if (!selectedDate) return null;

  return (
    <div className="fixed right-0 top-16 w-64 bg-white shadow-lg h-full">
      <button onClick={onClose} className="p-2 text-blue-600 text-sm font-bold">× Cerrar</button>
      <div className="p-4">
        <h2 className="text-lg font-bold">
          {selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          No hay nada planeado para este día.
        </p>
        <img
          src={specialImage}
          alt="Imagen especial"
          className="w-3/5 h-auto mx-auto rounded-md mb-3" // Reducir tamaño
        />
        <p className="text-center font-semibold text-gray-500">
          ¡Disfrútelo!
        </p>
      </div>
    </div>
  );
}

export default DayDetailsSidebar;
