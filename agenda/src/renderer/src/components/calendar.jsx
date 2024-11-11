import React, { useState } from 'react';

function Calendar() {
  const [view, setView] = useState('month');

  const renderCalendarView = () => {
    switch(view) {
      case 'day':
        return <p>Vista Día</p>;
      case 'week':
        return <p>Vista Semana</p>;
      case 'month':
        return <p>Vista Mes</p>;
      case 'workWeek':
        return <p>Vista Semana Laboral</p>;
      default:
        return <p>Vista Mes</p>;
    }
  };

  return (
    <div>
      <div className="flex justify-around mb-4">
        <button onClick={() => setView('day')}>Día</button>
        <button onClick={() => setView('week')}>Semana</button>
        <button onClick={() => setView('workWeek')}>Semana Laboral</button>
        <button onClick={() => setView('month')}>Mes</button>
      </div>
      {renderCalendarView()}
    </div>
  );
}

export default Calendar;
