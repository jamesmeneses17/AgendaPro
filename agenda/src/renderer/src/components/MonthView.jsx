import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  getDay,
  isToday,
} from 'date-fns';
import { es } from 'date-fns/locale';
import EventForm from './EventForm';

function MonthView({ date, setDate, events = [] }) {
  const [currentMonth, setCurrentMonth] = useState(date || new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (date) {
      setCurrentMonth(date); // Sincroniza el mes actual con la fecha seleccionada
    }
  }, [date]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startDay = (getDay(startOfMonth(currentMonth)) + 6) % 7;

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day) => {
    if (timer) {
      clearTimeout(timer); // Cancela el temporizador para el clic simple
      setTimer(null);
      setShowForm(true); // Abre el formulario para el día seleccionado
    } else {
      const newTimer = setTimeout(() => {
        setSelectedDay(day); // Muestra los detalles del día seleccionado
        setDate(day);
        setTimer(null);
      }, 250); // Tiempo para diferenciar entre clic simple y doble clic
      setTimer(newTimer);
    }
  };

  const handleAddEvent = (event) => {
    console.log('Evento agregado:', event); // Aquí puedes manejar la lógica para guardar eventos
    setShowForm(false); // Cierra el formulario después de agregar el evento
  };

  const handleCloseForm = () => {
    setShowForm(false); // Cierra el formulario sin guardar
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        {/* Barra de navegación del mes */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePreviousMonth} className="p-2">
            &#8592;
          </button>
          <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy', { locale: es })}</h2>
          <button onClick={handleNextMonth} className="p-2">
            &#8594;
          </button>
        </div>

        {/* Cabecera del calendario */}
        <div className="grid grid-cols-7 gap-1">
          {/* Espacios en blanco para los días antes del inicio del mes */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="h-16"></div>
          ))}

          {/* Días del mes */}
          {daysInMonth.map((day) => {
            // Filtrar eventos que coinciden con el día actual
            const dayEvents = events.filter(
              (event) => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            const hasEvents = dayEvents.length > 0; // Determina si el día tiene eventos

            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`h-20 p-1 border rounded flex flex-col justify-between cursor-pointer hover:bg-gray-200 relative ${
                  hasEvents ? 'bg-red-100' : '' // Fondo de color si tiene eventos
                }`}
              >
                {/* Número del día */}
                <div
                  className={`text-sm font-bold flex items-center justify-center ${
                    isToday(day) ? 'bg-blue-500 text-white rounded-full w-8 h-8 mx-auto' : ''
                  }`}
                >
                  {format(day, 'd', { locale: es })}
                </div>

                {/* Indicador de eventos */}
                {hasEvents && (
                  <div className="w-4 h-4 bg-red-500 rounded-full absolute top-1 right-1"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Formulario de evento */}
      {showForm && (
        <EventForm
          selectedDate={selectedDay} // Pasa el día seleccionado al formulario
          onClose={handleCloseForm}
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
}

export default MonthView;
