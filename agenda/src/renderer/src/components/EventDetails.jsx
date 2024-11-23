import React from "react";

function EventDetails({ event }) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold text-xl mb-4">{event.title}</h2>
      <p>
        <strong>Hora de inicio:</strong> {event.startTime}
      </p>
      <p>
        <strong>Hora de fin:</strong> {event.endTime}
      </p>
      <p>
        <strong>Descripción:</strong> {event.description || "Sin descripción"}
      </p>
      <p>
        <strong>Recordatorio:</strong> {event.reminder}
      </p>
    </div>
  );
}

export default EventDetails;
