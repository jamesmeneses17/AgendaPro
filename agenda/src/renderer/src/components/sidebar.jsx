import React from 'react';
import CalendarSidebar from './calendarSidebar';

function Sidebar({
  isOpen,
  toggleSidebar,
  setView,
  setSelectedDate,
  workWeekRange,
  fullWeekRange,
  currentView,
}) {
  const handleDateSelection = (selectedDate) => {
    setSelectedDate(selectedDate);

    // Cambiar automáticamente a la vista correspondiente
    if (currentView === 'workWeek') {
      setView('workWeek');
    } else if (currentView === 'week') {
      setView('week');
    }
  };

  return (
    <div>
      {!isOpen && (
        <button onClick={toggleSidebar} className="p-2 bg-white">
          <span className="material-icons text-blue-600">menu</span>
        </button>
      )}
      <div
        className={`fixed top-16 left-0 h-[calc(100%-3rem)] w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <button onClick={toggleSidebar} className="p-2">
          <span className="material-icons text-blue-600">close</span>
        </button>
        <div className="p-4">
          <h2 className="font-semibold text-lg">Navegación</h2>
          <ul className="mt-4">
            <li className="py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setView('day')}>
              Día
            </li>
            <li
              className="py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => setView('workWeek')}
            >
              Semana laboral
            </li>
            <li
              className="py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => setView('week')}
            >
              Semana
            </li>
            <li className="py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setView('month')}>
              Mes
            </li>
          </ul>
          <CalendarSidebar
            setSelectedDate={handleDateSelection}
            workWeekRange={currentView === 'workWeek' ? workWeekRange : null}
            fullWeekRange={currentView === 'week' ? fullWeekRange : null}
            view={currentView}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
