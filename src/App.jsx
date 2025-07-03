// App.jsx - Fullscreen, Real-time, Responsive Glassmorphism UI
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterTabs from "./components/FilterTabs";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (username) localStorage.setItem("username", username);
  }, [username]);

  const addTask = (task) => {
    setTasks([
      { ...task, id: Date.now(), createdAt: new Date(), completed: false },
      ...tasks,
    ]);
    setShowForm(false);
  };

  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id) =>
    window.confirm("Delete this task?") &&
    setTasks(tasks.filter((t) => t.id !== id));
  const editTask = (id, updated) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updated } : t)));

  const filteredTasks = tasks.filter((t) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && t.completed) ||
      (filter === "pending" && !t.completed);
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!username)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl"></div>
        <Login setUsername={setUsername} />
      </div>
    );

  return (
    <div
      className={`${
        dark
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-gray-800"
      } min-h-screen w-full flex items-center justify-center p-4 transition-all relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xl"></div>
      <div className="relative z-10 backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl shadow-xl w-full max-w-7xl h-[95vh] border-gray-200 mx-auto p-4 md:p-8 space-y-6 ">
        <Header
          username={username}
          setDark={setDark}
          dark={dark}
          setShowForm={setShowForm}
        />
        <SearchBar search={search} setSearch={setSearch} />
        <FilterTabs filter={filter} setFilter={setFilter} tasks={tasks} />
        <div className="flex-1 overflow-auto pr-2">
          <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        </div>
        {showForm && <TaskForm setShowForm={setShowForm} addTask={addTask} />}
      </div>
    </div>
  );
}
