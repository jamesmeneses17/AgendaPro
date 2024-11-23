import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import EventForm from './EventForm';

function DayView({ date, setDate }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // Hora seleccionada
  const [events, setEvents] = useState([]); // Lista de eventos para el día

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handlePreviousDay = () => {
    setDate(subDays(date, 1)); // Mueve al día anterior
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1)); // Mueve al día siguiente
  };

  const handleRowClick = (hour) => {
    const time = { hour, minute: 0 }; // Hora seleccionada por defecto
    setSelectedTime(time); // Guarda la hora seleccionada
    setShowForm(true); // Abre el formulario de evento
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]); // Agrega el nuevo evento a la lista
    setShowForm(false); // Cierra el formulario
  };

  const handleCloseForm = () => {
    setShowForm(false); // Cierra el formulario
    setSelectedTime(null); // Restablece la hora seleccionada
  };

  return (
    <div className="p-4">
      {/* Navegación del día */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousDay} className="text-blue-600">&#8592;</button>
        <h2 className="text-xl font-bold">{format(date, 'EEEE, d MMMM yyyy')}</h2>
        <button onClick={handleNextDay} className="text-blue-600">&#8594;</button>
      </div>

      {/* Vista de horas del día */}
      <div className="border border-gray-300 h-[calc(100vh-200px)] overflow-y-auto">
        {hours.map((hour) => (
          <div
            key={hour}
            className="border-b border-gray-200 p-2 h-12 flex items-center cursor-pointer hover:bg-blue-100"
            onClick={() => handleRowClick(hour)} // Maneja el clic en una hora
          >
            <span className="w-16 text-right pr-4">{`${hour}:00`}</span>
            <div className="flex-1 border-l border-gray-200 h-full pl-4"></div>
          </div>
        ))}
      </div>

      {/* Formulario de evento */}
      {showForm && (
        <EventForm
          selectedDate={date} // Pasa la fecha seleccionada al formulario
          selectedTime={selectedTime} // Pasa la hora seleccionada al formulario
          onClose={handleCloseForm} // Maneja el cierre del formulario
          onSubmit={handleAddEvent} // Maneja la adición de eventos
        />
      )}
    </div>
  );
}

export default DayView;
