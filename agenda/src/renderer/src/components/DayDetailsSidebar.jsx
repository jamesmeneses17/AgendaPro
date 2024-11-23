import React, { useState } from "react";
import specialImage from "../assets/images/calendario.png"; // Ruta de la imagen
import EventForm from "./EventForm"; // Importa el formulario para editar eventos

function DayDetailsSidebar({
  selectedDate,
  events,
  onClose,
  onRefreshEvents,
}) {
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado

  if (!selectedDate) return null;

  // Filtrar eventos para la fecha seleccionada
  const filteredEvents = events.filter(
    (event) => event.date === selectedDate.toISOString().split("T")[0]
  );

  // Manejar clic en un evento
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Cargar la información del evento seleccionado
  };

  const handleCloseForm = () => {
    setSelectedEvent(null); // Cierra el formulario y limpia el evento seleccionado
  };

  return (
    <div className="fixed right-0 top-16 w-64 bg-white shadow-lg h-full">
      <button
        onClick={onClose}
        className="p-2 text-blue-600 text-sm font-bold"
      >
        × Cerrar
      </button>
      <div className="p-4">
        <h2 className="text-lg font-bold">
          {selectedDate.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </h2>

        {/* Mostrar eventos o mensaje de vacío */}
        {filteredEvents.length === 0 ? (
          <>
            <p className="text-gray-600 text-sm mb-4">
              No hay eventos para este día.
            </p>
            <img
              src={specialImage}
              alt="Imagen especial"
              className="w-3/5 h-auto mx-auto rounded-md mb-3"
            />
            <p className="text-center font-semibold text-gray-500">
              ¡Disfrútelo!
            </p>
          </>
        ) : (
          <div className="space-y-2">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="p-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleEventClick(event)} // Abre el formulario al hacer clic
              >
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Botón para actualizar eventos */}
        <button
          onClick={onRefreshEvents}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Actualizar eventos
        </button>
      </div>

      {/* Mostrar el formulario con la información del evento */}
      {selectedEvent && (
        <EventForm
          selectedEvent={selectedEvent} // Pasa el evento seleccionado
          onClose={handleCloseForm} // Maneja el cierre del formulario
        />
      )}
    </div>
  );
}

export default DayDetailsSidebar;
