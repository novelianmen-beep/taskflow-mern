import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";

export const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function Board() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [modal, setModal] = useState(null); // { task?, status? }

  useEffect(() => {
    api
      .get("/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => setError("Could not load tasks"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (priority === "all" || t.priority === priority)
      ),
    [tasks, search, priority]
  );

  const saveTask = async (data, id) => {
    if (id) {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } else {
      const res = await api.post("/tasks", data);
      setTasks((prev) => [res.data, ...prev]);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // Drag & drop: update UI instantly, roll back if the server fails
  const moveTask = async (id, status) => {
    const original = tasks.find((t) => t._id === id);
    if (!original || original.status === status) return;
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await api.put(`/tasks/${id}`, { status });
    } catch {
      setTasks((prev) => prev.map((t) => (t._id === id ? original : t)));
      setError("Could not move task, change reverted");
    }
  };

  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">▦ TaskFlow</div>
        <div className="topbar-right">
          <span className="muted hide-sm">Hi, {user.name.split(" ")[0]}</span>
          <button className="btn ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <main className="container">
        <div className="toolbar">
          <div>
            <h1>My Board</h1>
            <p className="muted">
              {done} of {tasks.length} tasks completed
            </p>
          </div>
          <div className="filters">
            <input
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="btn primary" onClick={() => setModal({})}>
              + New task
            </button>
          </div>
        </div>

        {error && (
          <div className="error" onClick={() => setError("")}>
            {error}
          </div>
        )}

        {loading ? (
          <p className="muted">Loading…</p>
        ) : (
          <div className="board">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={filtered.filter((t) => t.status === col.id)}
                onDrop={moveTask}
                onAdd={() => setModal({ status: col.id })}
                onEdit={(task) => setModal({ task })}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {modal && (
        <TaskModal
          task={modal.task}
          defaultStatus={modal.status}
          onSave={saveTask}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
