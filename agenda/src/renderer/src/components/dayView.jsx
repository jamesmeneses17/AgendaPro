// src/components/DayView.jsx
import React from 'react';
import { format, addDays, subDays } from 'date-fns';

function DayView({ date, setDate }) {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const handlePreviousDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousDay} className="text-blue-600">&#8592;</button>
        <h2 className="text-xl font-bold">{format(date, 'EEEE, d MMMM yyyy')}</h2>
        <button onClick={handleNextDay} className="text-blue-600">&#8594;</button>
      </div>
      <div className="border border-gray-300 h-[calc(100vh-200px)] overflow-y-auto">
        {hours.map((hour, index) => (
          <div key={index} className="border-b border-gray-200 p-2 h-12 flex items-center">
            <span className="w-16 text-right pr-4">{hour}</span>
            <div className="flex-1 border-l border-gray-200 h-full pl-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayView;
