import React, { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import EventForm from "./EventForm";
import DayDetailsSidebar from "./DayDetailsSidebar";

function WorkWeekView({
  date,
  setDate,
  events,
  onShowDayDetails,
  onRefreshEvents,
  onDeleteEvent,
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timer, setTimer] = useState(null);

  const startDate = startOfWeek(date, { weekStartsOn: 1 }); // Lunes como primer día de la semana
  const days = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // De lunes a viernes
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleCellClick = (day) => {
    if (timer) {
      clearTimeout(timer); // Cancela el temporizador si es doble clic
      setTimer(null);
      setSelectedDate(day);
      setShowForm(true); // Abre el formulario al doble clic
    } else {
      const newTimer = setTimeout(() => {
        setTimer(null); // Resetea el temporizador
        if (onShowDayDetails) {
          onShowDayDetails(day); // Llama a la función para mostrar los detalles del día
        }
        setSelectedDate(day); // Abre la barra lateral
      }, 250); // Espera 250ms para diferenciar un clic de un doble clic
      setTimer(newTimer);
    }
  };

  const handleAddEvent = (event) => {
    setShowForm(false); // Oculta el formulario después de guardar
    setSelectedDate(null);
  };

  const handleCloseForm = () => {
    setShowForm(false); // Oculta el formulario al cancelar
    setSelectedDate(null);
  };

  const handleCloseSidebar = () => {
    setSelectedDate(null); // Cierra la barra lateral
  };

  return (
    <div className="p-4 flex">
      <div className="flex-1">
        {/* Barra de navegación de la semana laboral */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setDate(addDays(date, -7))}
            className="text-blue-600"
          >
            &#8592;
          </button>
          <h2 className="text-xl font-bold">
            {format(days[0], "dd")} de{" "}
            {format(days[0], "MMMM yyyy", { locale: es })} -{" "}
            {format(days[4], "dd")} de{" "}
            {format(days[4], "MMMM yyyy", { locale: es })}
          </h2>
          <button
            onClick={() => setDate(addDays(date, 7))}
            className="text-blue-600"
          >
            &#8594;
          </button>
        </div>

        {/* Tabla de la semana laboral */}
        <div className="grid grid-cols-6 border border-gray-300 h-[calc(100vh-200px)] overflow-y-auto">
          {/* Columna de horas */}
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

          {/* Columnas de días laborales */}
          {days.map((day, dayIndex) => {
            const dayEvents = events.filter(
              (event) => event.date === day.toISOString().split("T")[0]
            );

            return (
              <div key={dayIndex} className="text-center">
                {/* Encabezado de cada día */}
                <div className="bg-gray-100 text-black font-semibold py-2 sticky top-0 z-10 border-b">
                  {format(day, "EEEE", { locale: es })} <br />
                  {format(day, "dd")}
                </div>
                {/* Celdas por hora */}
                {hours.map((hour) => {
                  const hasEventAtHour = dayEvents.some(
                    (event) => parseInt(event.startTime.split(":")[0]) === hour
                  );

                  return (
                    <div
                      key={`${dayIndex}-${hour}`}
                      className={`h-12 border-b border-l flex items-center cursor-pointer ${
                        hasEventAtHour ? "bg-green-200" : "hover:bg-blue-100"
                      }`}
                      onClick={() => handleCellClick(day)}
                    >
                      <div className="flex-1"></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Formulario para agregar/editar eventos */}
        {showForm && (
          <EventForm
            selectedDate={selectedDate}
            onClose={handleCloseForm}
            onSubmit={handleAddEvent}
          />
        )}
      </div>

      {/* Barra lateral de detalles del día */}
      {selectedDate && (
        <DayDetailsSidebar
          selectedDate={selectedDate}
          events={events.filter(
            (event) => event.date === selectedDate.toISOString().split("T")[0]
          )}
          onClose={handleCloseSidebar}
          onRefreshEvents={onRefreshEvents}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </div>
  );
}

export default WorkWeekView;
