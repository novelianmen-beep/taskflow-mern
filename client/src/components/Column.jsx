import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onDrop, onAdd, onEdit, onDelete }) {
  const [over, setOver] = useState(false);

  return (
    <section
      className={`column ${over ? "over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault(); // required to allow dropping
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDrop(id, column.id);
      }}
    >
      <div className="column-head">
        <h2>
          {column.title} <span className="count">{tasks.length}</span>
        </h2>
        <button className="icon-btn" onClick={onAdd} aria-label="Add task">
          +
        </button>
      </div>

      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Drop tasks here</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task._id)}
          />
        ))}
      </div>
    </section>
  );
}
