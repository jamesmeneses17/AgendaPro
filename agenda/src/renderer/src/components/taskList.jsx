import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="task-list">
      <h3>Tareas para el Día</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{task.title} - {task.time}</span>
            <div>
              <button onClick={() => onEdit(task)}>Editar</button>
              <button onClick={() => onDelete(task)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
