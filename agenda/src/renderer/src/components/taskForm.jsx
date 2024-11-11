import React, { useState } from 'react';

function TaskForm({ onSubmit, task }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [date, setDate] = useState(task ? task.date : '');
  const [time, setTime] = useState(task ? task.time : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, date, time });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>Título:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Fecha:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>Hora:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default TaskForm;
