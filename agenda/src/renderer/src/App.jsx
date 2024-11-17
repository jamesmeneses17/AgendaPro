import React, { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import DayDetailsSidebar from './components/DayDetailsSidebar'; // Importa la barra lateral
import DayView from './components/dayView';
import WorkWeekView from './components/workWeekView';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView'; // Asegúrate de que el archivo MonthView exista
import { startOfWeek, addDays } from 'date-fns';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('day'); // Vista inicial
  const [date, setDate] = useState(new Date());
  const [workWeekRange, setWorkWeekRange] = useState(null); // Rango de semana laboral
  const [fullWeekRange, setFullWeekRange] = useState(null); // Rango de semana completa
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada para la barra lateral

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDateSelect = (selectedDate) => {
    setSelectedDate(selectedDate);
    setDate(selectedDate);

    if (view === 'workWeek') {
      updateWorkWeekRange(selectedDate); // Actualiza el rango de la semana laboral
    }

    if (view === 'week') {
      updateFullWeekRange(selectedDate); // Actualiza el rango de la semana completa
    }
  };

  const closeDayDetails = () => {
    setSelectedDate(null); // Cierra la barra lateral
  };

  const updateWorkWeekRange = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = addDays(start, 4); // Lunes a viernes
    setWorkWeekRange({ start, end });
  };

  const updateFullWeekRange = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = addDays(start, 6); // Lunes a domingo
    setFullWeekRange({ start, end });
  };

  return (
    <div className="App bg-white h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setView={setView}
          setSelectedDate={handleDateSelect}
          workWeekRange={workWeekRange}
          fullWeekRange={fullWeekRange}
          currentView={view} // Pasar la vista actual
        />

        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : ''
          } ${selectedDate ? 'mr-64' : ''}`} // Ajustar margen derecho si la barra lateral está activa
        >
          {/* Barra de navegación para cambiar la vista */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setView('day')}
                className={`${view === 'day' ? 'font-semibold' : ''}`}
              >
                Día
              </button>
              <button
                onClick={() => {
                  setView('workWeek');
                  updateWorkWeekRange(date); // Actualiza el rango al cambiar a semana laboral
                }}
                className={`${view === 'workWeek' ? 'font-semibold' : ''}`}
              >
                Semana laboral
              </button>
              <button
                onClick={() => {
                  setView('week');
                  updateFullWeekRange(date); // Actualiza el rango al cambiar a semana completa
                }}
                className={`${view === 'week' ? 'font-semibold' : ''}`}
              >
                Semana
              </button>
              <button
                onClick={() => setView('month')}
                className={`${view === 'month' ? 'font-semibold' : ''}`}
              >
                Mes
              </button>
            </div>
          </div>

          {/* Vista de día */}
          {view === 'day' && <DayView date={date} setDate={setDate} />}

          {/* Vista de semana laboral */}
          {view === 'workWeek' && (
            <WorkWeekView
              date={date}
              setDate={(selectedDate) => {
                setDate(selectedDate);
                updateWorkWeekRange(selectedDate);
              }}
            />
          )}

          {/* Vista de semana completa */}
          {view === 'week' && (
            <WeekView
              date={date}
              setDate={(selectedDate) => {
                setDate(selectedDate);
                updateFullWeekRange(selectedDate);
              }}
            />
          )}

          {/* Vista del mes */}
          {view === 'month' && <MonthView date={date} setDate={handleDateSelect} />}
        </main>
      </div>

      {/* Barra lateral de detalles del día */}
      {selectedDate && (
        <DayDetailsSidebar selectedDate={selectedDate} onClose={closeDayDetails} />
      )}
    </div>
  );
}

export default App;
