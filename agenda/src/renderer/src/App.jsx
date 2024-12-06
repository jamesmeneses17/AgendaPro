import React, { useState, useEffect } from 'react'
import Sidebar from './components/sidebar'
import DayDetailsSidebar from './components/DayDetailsSidebar'
import WorkWeekView from './components/workWeekView'
import WeekView from './components/WeekView'
import MonthView from './components/MonthView'
import Login from './components/Login'
import Header from './components/header' // Header con minimizar, maximizar y cerrar
import { startOfWeek, addDays } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify'
import { fetchEventsFromFirestore } from './firebase/firestoreService' // Importa la función para cargar eventos
import 'react-toastify/dist/ReactToastify.css'
import { deleteEventFromFirestore } from './firebase/firestoreService' // Importar función de eliminación
import { requestNotificationPermission, sendNotification } from './notifications'
import { useNotifications } from './hooks/useNotifications'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [view, setView] = useState('day')
  const [date, setDate] = useState(new Date())
  const [workWeekRange, setWorkWeekRange] = useState(null)
  const [fullWeekRange, setFullWeekRange] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [events, setEvents] = useState([]) // Almacena los eventos
  const { checkUpcomingEvents } = useNotifications(events)

  // Cargar eventos al montar el componente
  useEffect(() => {
    const interval = setInterval(() => {
      checkUpcomingEvents() // Verifica eventos cada minuto
    }, 60000)

    return () => clearInterval(interval) // Limpia el intervalo al desmontar
  }, [events])

  // Función para cargar eventos desde Firestore
  const loadEvents = async () => {
    try {
      const fetchedEvents = await fetchEventsFromFirestore()
      setEvents(fetchedEvents)
      console.log('Eventos cargados:', fetchedEvents)
    } catch (error) {
      console.error('Error al cargar eventos:', error)
      toast.error('Error al cargar eventos.')
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleDateSelect = (selectedDate) => {
    setSelectedDate(selectedDate)
    setDate(selectedDate)

    if (view === 'workWeek') {
      updateWorkWeekRange(selectedDate)
    }

    if (view === 'week') {
      updateFullWeekRange(selectedDate)
    }
  }

  const closeDayDetails = () => {
    setSelectedDate(null)
  }

  const updateWorkWeekRange = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 })
    const end = addDays(start, 4)
    setWorkWeekRange({ start, end })
  }

  const updateFullWeekRange = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 })
    const end = addDays(start, 6)
    setFullWeekRange({ start, end })
  }

  const handleLogin = (isSuccess, message) => {
    if (isSuccess) {
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => setIsAuthenticated(true) // Autentica después de cerrar la notificación
      })
    } else {
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  const handleLogout = () => {
    toast.success(
      <div className="flex items-center">
        <span className="text-green-500 text-xl mr-2"></span>
        <span>Sesión cerrada correctamente.</span>
      </div>,
      {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => setIsAuthenticated(false) // Cierra sesión después de la notificación
      }
    )
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEventFromFirestore(eventId) // Eliminar de Firestore
      const updatedEvents = events.filter((event) => event.id !== eventId)
      setEvents(updatedEvents) // Actualiza el estado con los eventos restantes
      toast.success('Evento eliminado correctamente.')
    } catch (error) {
      console.error('Error al eliminar el evento:', error)
      toast.error('Error al eliminar el evento.')
    }
  }

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Tu navegador no soporta notificaciones.')
      return
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        alert('Las notificaciones no están habilitadas.')
      }
    }
  }

  const sendNotification = (event) => {
    if (Notification.permission === 'granted') {
      const eventTime = new Date(event.date + ' ' + event.startTime).toLocaleTimeString()

      const notification = new Notification(`Evento: ${event.title}`, {
        body: `Inicio: ${eventTime}\nDescripción: ${event.description}`
      })

      notification.onclick = () => {
        console.log('Notificación clickeada')
      }
    }
  }

  return (
    <div className="App bg-white h-screen flex flex-col overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: '45px' }} // Incrementa el margen superior para moverla hacia abajo
      />
      <Header /> {/* Incluye el header con controles */}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex flex-1">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            onLogout={handleLogout}
            setSelectedDate={handleDateSelect}
            workWeekRange={workWeekRange}
            fullWeekRange={fullWeekRange}
            currentView={view}
            setView={setView}
          />

          <main
            className={`flex-1 p-4 transition-all duration-300 ${
              isSidebarOpen ? 'ml-64' : ''
            } ${selectedDate ? 'mr-64' : ''}`}
          >
            {/* Barra de navegación para cambiar la vista */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-6">
                
                <button
                  onClick={() => {
                    setView('workWeek')
                    updateWorkWeekRange(date)
                  }}
                  className={`text-lg ${
                    view === 'workWeek' ? 'font-bold text-black' : 'font-normal text-gray-700'
                  }`}
                >
                  Semana laboral
                </button>
                <button
                  onClick={() => {
                    setView('week')
                    updateFullWeekRange(date)
                  }}
                  className={`text-lg ${
                    view === 'week' ? 'font-bold text-black' : 'font-normal text-gray-700'
                  }`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setView('month')}
                  className={`text-lg ${
                    view === 'month' ? 'font-bold text-black' : 'font-normal text-gray-700'
                  }`}
                >
                  Mes
                </button>
              </div>
            </div>

            {/* Renderizado de vistas */}
         


            {view === 'workWeek' && (
              <WorkWeekView
                             date={date}
                setDate={setDate}
                events={events}
                onShowDayDetails={setSelectedDate} // Conecta `setSelectedDate` aquí
              />
            )}
            {view === 'week' && (
              <WeekView
                date={date}
                setDate={setDate}
                events={events}
                onShowDayDetails={setSelectedDate} // Conecta `setSelectedDate` aquí
              />
            )}

            {view === 'month' && (
              <MonthView
                date={date}
                setDate={setDate}
                events={events}
                onShowDayDetails={setSelectedDate} // Aquí se pasa la función que muestra el DayDetailsSidebar
              />
            )}
          </main>

          {/* Barra lateral de detalles del día */}
          {selectedDate && (
            <DayDetailsSidebar
              selectedDate={selectedDate}
              events={events.filter(
                (event) => event.date === selectedDate.toISOString().split('T')[0]
              )}
              onClose={closeDayDetails}
              onRefreshEvents={loadEvents} // Botón para actualizar eventos
              onDeleteEvent={handleDeleteEvent} // Pasa la función de eliminar
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App
