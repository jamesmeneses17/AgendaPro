// App.jsx
import React, { useState } from 'react'
import Header from './components/header'
import Sidebar from './components/sidebar'
import TaskList from './components/taskList'
import TaskForm from './components/taskForm'
import DayView from './components/dayView'
import WorkWeekView from './components/workWeekView'
import { format, addDays, subDays, startOfWeek } from 'date-fns'

function App() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [view, setView] = useState('day')
  const [date, setDate] = useState(new Date())

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const addTask = (task) => {
    setTasks([...tasks, task])
    setShowForm(false)
  }

  const editTask = (task) => {
    setSelectedTask(task)
    setShowForm(true)
  }

  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t !== task))
  }

  const goToPreviousDay = () => {
    setDate(subDays(date, 1))
  }

  const goToNextDay = () => {
    setDate(addDays(date, 1))
  }

  const setSelectedDate = (selectedDate) => {
    setDate(selectedDate)
    // Cambiar automáticamente a la vista de la semana laboral
    setView('workWeek')
  }

  return (
    <div className="App bg-white h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setView={setView}
          setSelectedDate={setSelectedDate}
        />

        <main
          className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
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
                onClick={() => setView('workWeek')}
                className={`${view === 'workWeek' ? 'font-semibold' : ''}`}
              >
                Semana laboral
              </button>
              <button
                onClick={() => setView('week')}
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
          {view === 'workWeek' && <WorkWeekView date={date} setDate={setDate} />}

          {/* Vista de mes con lista de tareas */}
          {view === 'month' && (
            <div>
              <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
              {showForm && <TaskForm onSubmit={addTask} task={selectedTask} />}
              <button
                onClick={() => setShowForm(true)}
                className="p-2 bg-blue-500 text-white rounded mt-4"
              >
                Agregar Tarea
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
