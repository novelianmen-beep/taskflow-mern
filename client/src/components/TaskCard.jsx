export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue =
    task.dueDate &&
    task.status !== "done" &&
    new Date(task.dueDate) < new Date(new Date().toDateString());

  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", task._id)}
    >
      <div className="card-top">
        <span className={`badge ${task.priority}`}>{task.priority}</span>
        <div className="card-actions">
          <button className="icon-btn" onClick={onEdit} aria-label="Edit">
            ✎
          </button>
          <button className="icon-btn" onClick={onDelete} aria-label="Delete">
            ✕
          </button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p className="muted">{task.description}</p>}
      {task.dueDate && (
        <p className={`due ${overdue ? "overdue" : ""}`}>
          {overdue ? "Overdue · " : "Due "}
          {new Date(task.dueDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </article>
  );
}
