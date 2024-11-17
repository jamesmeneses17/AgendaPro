// EventForm.jsx
import React from 'react';

function EventForm({ selectedTime, onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const event = {
      title: formData.get('title'),
      startTime: formData.get('startTime'),
      endTime: formData.get('endTime'),
      reminder: formData.get('reminder'), // Incluye la opción de "Recordar"
      description: formData.get('description'),
    };
    onSubmit(event);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Agregar un evento</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              name="title"
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Hora de inicio</label>
            <input
              name="startTime"
              type="time"
              defaultValue={
                selectedTime
                  ? `${String(selectedTime.hour).padStart(2, '0')}:${String(selectedTime.minute).padStart(2, '0')}`
                  : ''
              }
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Hora de fin</label>
            <input
              name="endTime"
              type="time"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Recordatorio</label>
            <select
              name="reminder"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              defaultValue="15 minutos antes"
            >
              <option value="noReminder">No recordármelo</option>
              <option value="eventTime">En el momento del evento</option>
              <option value="5Minutes">5 minutos antes</option>
              <option value="15Minutes">15 minutos antes</option>
              <option value="30Minutes">30 minutos antes</option>
              <option value="1Hour">1 hora antes</option>
              <option value="2Hours">2 horas antes</option>
              <option value="12Hours">12 horas antes</option>
              <option value="1Day">1 día antes</option>
              <option value="1Week">1 semana antes</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="description"
              rows="3"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;