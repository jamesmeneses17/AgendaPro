import React from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
} from 'date-fns';
import { es } from 'date-fns/locale';

function CalendarSidebar({ setSelectedDate, workWeekRange, fullWeekRange, view }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const startDay = (getDay(startOfMonth(currentMonth)) + 6) % 7;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth}>&#8592;</button>
        <h2 className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy', { locale: es })}</h2>
        <button onClick={handleNextMonth}>&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="text-center"></div>
        ))}
        {daysInMonth.map((day) => {
          const isInWorkWeek =
            workWeekRange &&
            view === 'workWeek' &&
            day >= workWeekRange.start &&
            day <= workWeekRange.end;

          const isInFullWeek =
            fullWeekRange &&
            view === 'week' &&
            day >= fullWeekRange.start &&
            day <= fullWeekRange.end;

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`text-center cursor-pointer p-2 rounded-full ${
                isToday(day)
                  ? 'bg-blue-500 text-white font-bold'
                  : isInWorkWeek || isInFullWeek
                  ? 'bg-blue-100 text-black font-semibold'
                  : 'hover:bg-gray-200'
              } ${
                getDay(day) === 0 ? 'text-red-600' : ''
              } transition-colors duration-200`}
              style={{
                minWidth: '36px',
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarSidebar;
