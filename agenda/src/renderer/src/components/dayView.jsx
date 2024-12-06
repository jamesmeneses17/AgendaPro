import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import EventForm from "./EventForm";
import DayDetailsSidebar from "./DayDetailsSidebar";

function DayView({ date, setDate, events = [], onShowDayDetails, onRefreshEvents, onDeleteEvent }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // Hora seleccionada
  const [selectedDay, setSelectedDay] = useState(date); // Día seleccionado (ajustado para inicializar con el día actual)
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado para edición
  const [timer, setTimer] = useState(null); // Temporizador para diferenciar entre clic simple y doble clic

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handlePreviousDay = () => {
    const newDate = subDays(selectedDay || date, 1);
    setDate(newDate);
    setSelectedDay(newDate); // Ajusta el día seleccionado al día anterior
  };

  const handleNextDay = () => {
    const newDate = addDays(selectedDay || date, 1);
    setDate(newDate);
    setSelectedDay(newDate); // Ajusta el día seleccionado al día siguiente
  };

  const handleRowClick = (hour) => {
    const time = { hour, minute: 0 }; // Hora seleccionada por defecto

    if (timer) {
      // Si hay un temporizador activo, es un doble clic
      clearTimeout(timer); // Cancela el temporizador
      setTimer(null); // Limpia el temporizador
      setSelectedTime(time); // Guarda la hora seleccionada
      setShowForm(true); // Abre el formulario
    } else {
      // Si no hay temporizador, es un clic simple
      const newTimer = setTimeout(() => {
        setTimer(null); // Resetea el temporizador
        setSelectedDay(date); // Muestra el día seleccionado
        if (onShowDayDetails) {
          onShowDayDetails(date); // Llama la función para mostrar los detalles
        }
      }, 250); // Espera 250ms para diferenciar entre clic y doble clic
      setTimer(newTimer); // Establece el temporizador
    }
  };

  const handleAddEvent = (event) => {
    setSelectedEvent(null); // Limpia el evento seleccionado
    setShowForm(false); // Cierra el formulario
    if (onRefreshEvents) {
      onRefreshEvents(); // Refresca los eventos
    }
  };

  const handleCloseForm = () => {
    setSelectedEvent(null); // Limpia el evento seleccionado
    setShowForm(false); // Cierra el formulario
  };

  useEffect(() => {
    // Asegura que la barra de detalles se sincronice correctamente con la fecha seleccionada
    if (!selectedDay) {
      setSelectedDay(date);
    }
  }, [date, selectedDay]);

  return (
    <div className="flex h-full">
      {/* Vista de horas del día */}
      <div className="flex-1 p-4">
        {/* Navegación del día */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePreviousDay} className="text-blue-600">
            &#8592;
          </button>
          <h2 className="text-xl font-bold">{format(selectedDay || date, "EEEE, d MMMM yyyy")}</h2>
          <button onClick={handleNextDay} className="text-blue-600">
            &#8594;
          </button>
        </div>

        {/* Vista de horas */}
        <div className="border border-gray-300 h-[calc(100vh-200px)] overflow-y-auto">
          {hours.map((hour) => {
            // Filtrar eventos que coinciden con la hora actual
            const hourEvents = events.filter(
              (event) =>
                format(new Date(event.date + " " + event.startTime), "yyyy-MM-dd HH") ===
                format(new Date(date.setHours(hour)), "yyyy-MM-dd HH")
            );

            return (
              <div
                key={hour}
                className="border-b border-gray-200 p-2 h-12 flex items-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(hour)} // Maneja el clic simple y doble clic
              >
                <span className="w-16 text-right pr-4">{`${hour}:00`}</span>
                <div className="flex-1 border-l border-gray-200 h-full pl-4 relative">
                  {hourEvents.map((event, index) => (
                    <div
                      key={index}
                      className="absolute top-1 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Barra de detalles de tareas */}
      {selectedDay && (
        <DayDetailsSidebar
          selectedDate={selectedDay} // Pasa la fecha seleccionada
          events={events.filter(
            (event) =>
              format(new Date(event.date), "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd")
          )}
          onClose={() => setSelectedDay(null)} // Cierra la barra lateral
          onRefreshEvents={onRefreshEvents} // Refresca eventos
          onDeleteEvent={onDeleteEvent} // Maneja eliminación
        />
      )}

      {/* Formulario de eventos */}
      {showForm && (
        <EventForm
          selectedDate={selectedDay || date} // Pasa la fecha seleccionada al formulario
          selectedTime={selectedTime} // Pasa la hora seleccionada al formulario
          selectedEvent={selectedEvent} // Pasa el evento seleccionado para edición
          onClose={handleCloseForm} // Maneja el cierre del formulario
          onSubmit={handleAddEvent} // Maneja la adición de eventos
        />
      )}
    </div>
  );
}

export default DayView;
