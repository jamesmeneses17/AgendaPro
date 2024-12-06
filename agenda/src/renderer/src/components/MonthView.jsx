import React, { useState, useEffect } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  getDay,
  isToday
} from 'date-fns'
import { es } from 'date-fns/locale'
import EventForm from './EventForm'

function MonthView({ date, setDate, events , onShowDayDetails }) {
  const [currentMonth, setCurrentMonth] = useState(date || new Date())
  const [showForm, setShowForm] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (date) {
      setCurrentMonth(date) // Sincroniza el mes actual con la fecha seleccionada
    }
  }, [date])

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })

  const startDay = (getDay(startOfMonth(currentMonth)) + 6) % 7

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDayClick = (day) => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
      setSelectedDay(day)
      setShowForm(true)
    } else {
      const newTimer = setTimeout(() => {
        setTimer(null)
        setDate(day)
        if (onShowDayDetails) {
          onShowDayDetails(day)
        }
      }, 250)
      setTimer(newTimer)
    }
  }

  const handleAddEvent = (event) => {
    console.log('Evento agregado:', event)
    setShowForm(false)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'] // Iniciales de los días de la semana

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

        {/* Cabecera con los nombres de los días */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-600">
          {weekDays.map((day, index) => (
            <div key={`weekDay-${index}`} className="h-10 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {/* Espacios en blanco para los días antes del inicio del mes */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="h-16"></div>
          ))}

{daysInMonth.map((day) => {
  const dayEvents = events.filter(
    (event) =>
      new Date(event.date).toISOString().split('T')[0] === day.toISOString().split('T')[0]
  );

  const hasEvents = dayEvents.length > 0; // Determina si el día tiene eventos

  return (
    <div
      key={day}
      onClick={() => handleDayClick(day)}
      className={`h-20 p-1 border rounded flex flex-col justify-between cursor-pointer hover:bg-gray-200 relative ${
        hasEvents ? 'bg-green-200' : '' // Fondo de color si tiene eventos
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
        <div className="mt-2 text-xs bg-blue-500 text-white rounded-full px-2 py-1 mx-auto">
          {dayEvents.length} evento(s)
        </div>
      )}
    </div>
  );
})}

        </div>
      </div>

      {/* Formulario de evento */}
      {showForm && (
        <EventForm selectedDate={selectedDay} onClose={handleCloseForm} onSubmit={handleAddEvent} />
      )}
    </div>
  )
}

export default MonthView
