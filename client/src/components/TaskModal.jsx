import { useState } from "react";

export default function TaskModal({ task, defaultStatus, onSave, onClose }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || defaultStatus || "todo",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave({ ...form, dueDate: form.dueDate || null }, task?._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save task");
      setSaving(false);
    }
  };

  return (
    <div className="overlay" onMouseDown={onClose}>
      <form
        className="modal"
        onSubmit={submit}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2>{task ? "Edit task" : "New task"}</h2>
        {error && <div className="error">{error}</div>}

        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          maxLength={120}
          required
          autoFocus
        />

        <label>Description</label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={onChange}
        />

        <div className="row">
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={onChange}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={onChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <label>Due date</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={onChange} />

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
