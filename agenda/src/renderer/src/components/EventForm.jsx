import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveEventToFirestore, updateEventInFirestore } from "../firebase/firestoreService";

function EventForm({ selectedEvent, selectedDate, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    reminder: "noReminder",
    description: "",
  });

  // Rellena el formulario al abrirlo, según `selectedEvent` o `selectedDate`
  useEffect(() => {
    if (selectedEvent) {
      // Si estamos editando un evento existente, carga sus datos
      setFormData({
        title: selectedEvent.title || "",
        date: selectedEvent.date || "",
        startTime: selectedEvent.startTime || "",
        endTime: selectedEvent.endTime || "",
        reminder: selectedEvent.reminder || "noReminder",
        description: selectedEvent.description || "",
      });
    } else if (selectedDate) {
      // Si es un nuevo evento, establece la fecha seleccionada
      setFormData((prev) => ({
        ...prev,
        date: selectedDate.toISOString().split("T")[0], // Formato ISO (yyyy-mm-dd)
      }));
    }
  }, [selectedEvent, selectedDate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedEvent && selectedEvent.id) {
        // Actualiza el evento existente
        await updateEventInFirestore(selectedEvent.id, formData);
        toast.success("Evento actualizado correctamente.");
      } else {
        // Crea un nuevo evento
        await saveEventToFirestore(formData);
        toast.success("Evento creado correctamente.");
      }
      onClose(); // Cierra el formulario
    } catch (error) {
      toast.error("Error al guardar el evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative z-60">
        <h2 className="text-lg font-bold mb-4">
          {selectedEvent ? "Editar evento" : "Agregar evento"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          {/* Campos del formulario */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Fecha</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Hora de inicio</label>
            <input
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Hora de fin</label>
            <input
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Recordatorio</label>
            <select
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="noReminder">No recordármelo</option>
              <option value="5Minutes">5 minutos antes</option>
              <option value="15Minutes">15 minutos antes</option>
              <option value="30Minutes">30 minutos antes</option>
              <option value="1Hour">1 hora antes</option>
              <option value="1Day">1 día antes</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
