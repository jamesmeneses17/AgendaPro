import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import DayDetailsSidebar from './components/DayDetailsSidebar';
import DayView from './components/dayView';
import WorkWeekView from './components/workWeekView';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView';
import Login from './components/Login';
import WindowControls from './components/WindowControls';
import Header from './components/header';
import { startOfWeek, addDays } from 'date-fns';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('day');
  const [date, setDate] = useState(new Date());
  const [workWeekRange, setWorkWeekRange] = useState(null);
  const [fullWeekRange, setFullWeekRange] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDateSelect = (selectedDate) => {
    setSelectedDate(selectedDate);
    setDate(selectedDate);

    if (view === 'workWeek') {
      updateWorkWeekRange(selectedDate);
    }

    if (view === 'week') {
      updateFullWeekRange(selectedDate);
    }
  };

  const closeDayDetails = () => {
    setSelectedDate(null);
  };

  const updateWorkWeekRange = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = addDays(start, 4);
    setWorkWeekRange({ start, end });
  };

  const updateFullWeekRange = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    setFullWeekRange({ start, end });
  };

  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
  };

  return (
    <div className="App bg-white h-screen flex flex-col overflow-hidden">
      {/* Controles de ventana siempre presentes */}
      <WindowControls />
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header />
          <div className="flex flex-1">
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              setView={setView}
              setSelectedDate={handleDateSelect}
              workWeekRange={workWeekRange}
              fullWeekRange={fullWeekRange}
              currentView={view}
            />

            <main
              className={`flex-1 p-4 transition-all duration-300 ${
                isSidebarOpen ? 'ml-64' : ''
              } ${selectedDate ? 'mr-64' : ''}`}
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
                      updateWorkWeekRange(date);
                    }}
                    className={`${view === 'workWeek' ? 'font-semibold' : ''}`}
                  >
                    Semana laboral
                  </button>
                  <button
                    onClick={() => {
                      setView('week');
                      updateFullWeekRange(date);
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

              {/* Renderizado de vistas */}
              {view === 'day' && <DayView date={date} setDate={setDate} />}
              {view === 'workWeek' && (
                <WorkWeekView
                  date={date}
                  setDate={(selectedDate) => {
                    setDate(selectedDate);
                    updateWorkWeekRange(selectedDate);
                  }}
                />
              )}
              {view === 'week' && (
                <WeekView
                  date={date}
                  setDate={(selectedDate) => {
                    setDate(selectedDate);
                    updateFullWeekRange(selectedDate);
                  }}
                />
              )}
              {view === 'month' && <MonthView date={date} setDate={handleDateSelect} />}
            </main>
          </div>

          {/* Barra lateral de detalles del día */}
          {selectedDate && (
            <DayDetailsSidebar selectedDate={selectedDate} onClose={closeDayDetails} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
