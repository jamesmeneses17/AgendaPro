import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import EventForm from './EventForm';

function DayView({ date, setDate }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [events, setEvents] = useState([]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handlePreviousDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  const handleRowClick = (hour) => {
    const time = { hour, minute: 0 }; // Hora seleccionada por defecto
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTime(null); // Restablece el tiempo seleccionado
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousDay} className="text-blue-600">&#8592;</button>
        <h2 className="text-xl font-bold">{format(date, 'EEEE, d MMMM yyyy')}</h2>
        <button onClick={handleNextDay} className="text-blue-600">&#8594;</button>
      </div>

      <div className="border border-gray-300 h-[calc(100vh-200px)] overflow-y-auto">
        {hours.map((hour) => (
          <div
            key={hour}
            className="border-b border-gray-200 p-2 h-12 flex items-center cursor-pointer hover:bg-blue-100"
            onClick={() => handleRowClick(hour)}
          >
            <span className="w-16 text-right pr-4">{`${hour}:00`}</span>
            <div className="flex-1 border-l border-gray-200 h-full pl-4"></div>
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

export default DayView;
