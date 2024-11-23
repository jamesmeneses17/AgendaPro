import React from 'react';
import specialImage from '../assets/images/calendario.png'; // Ruta de la imagen

function DayDetailsSidebar({ selectedDate, events, onClose, onRefreshEvents }) {
  if (!selectedDate) return null;

  return (
    <div className="fixed right-0 top-16 w-64 bg-white shadow-lg h-full overflow-y-auto">
      <button onClick={onClose} className="p-2 text-blue-600 text-sm font-bold">× Cerrar</button>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          {selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </h2>

        {/* Mostrar eventos */}
        {events && events.length > 0 ? (
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li
                key={index}
                className="p-2 border rounded shadow-sm bg-gray-50 hover:bg-gray-100"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {event.startTime} - {event.endTime}
                </p>
                {event.description && (
                  <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-gray-600 text-sm mb-4">No hay eventos para este día.</p>
            <img
              src={specialImage}
              alt="Imagen especial"
              className="w-3/5 h-auto mx-auto rounded-md mb-3"
            />
            <p className="text-center font-semibold text-gray-500">¡Disfrútelo!</p>
          </div>
        )}

        {/* Botón para actualizar eventos */}
        <div className="mt-4 text-center">
          <button
            onClick={onRefreshEvents}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Actualizar eventos
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayDetailsSidebar;
