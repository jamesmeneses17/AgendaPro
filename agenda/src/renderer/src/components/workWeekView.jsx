import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import EventForm from './EventForm';

function WorkWeekView({ date, setDate }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [events, setEvents] = useState([]);

  const startDate = startOfWeek(date, { weekStartsOn: 1 }); // Comienza desde el lunes
  const days = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // De lunes a viernes
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleRowClick = (day, hour) => {
    const time = {
      day,
      hour,
      minute: 0,
    };
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
    setSelectedTime(null); // Limpia la selección
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTime(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setDate(addDays(date, -7))}
          className="text-blue-600"
        >
          &#8592;
        </button>
        <h2 className="text-xl font-bold">
          {format(days[0], 'dd')} de {format(days[0], 'MMMM yyyy', { locale: es })} -{' '}
          {format(days[4], 'dd')} de {format(days[4], 'MMMM yyyy', { locale: es })}
        </h2>
        <button
          onClick={() => setDate(addDays(date, 7))}
          className="text-blue-600"
        >
          &#8594;
        </button>
      </div>

      <div className="grid grid-cols-6 border border-gray-300 h-[calc(100vh-200px)] overflow-y-auto">
        {/* Columna "Horas" */}
        <div className="bg-gray-100 text-center sticky top-0 z-10">
          <div className="py-6 border-b text-sm text-black">Horas</div>
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b flex items-center justify-center text-black"
            >
              {`${hour}:00`}
            </div>
          ))}
        </div>

        {/* Días de la semana laboral */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="text-center">
            <div className="bg-gray-100 text-black font-semibold py-2 sticky top-0 z-10 border-b">
              {format(day, 'EEEE', { locale: es })} <br />
              {format(day, 'dd')}
            </div>
            {hours.map((hour) => (
              <div
                key={`${dayIndex}-${hour}`}
                className="h-12 border-b border-l flex items-center cursor-pointer hover:bg-blue-100"
                onClick={() => handleRowClick(day, hour)}
              >
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showForm && (
        <EventForm
          selectedTime={selectedTime}
          onClose={handleCloseForm}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
}

export default WorkWeekView;
