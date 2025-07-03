import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export default function TaskProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
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
    setTasks([{ ...task, id: Date.now(), createdAt: new Date(), completed: false }, ...tasks]);
    setShowForm(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    window.confirm("Delete this task?") && setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, updated) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

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

  return (
    <TaskContext.Provider
      value={{
        username,
        setUsername,
        tasks,
        setTasks,
        filter,
        setFilter,
        showForm,
        setShowForm,
        search,
        setSearch,
        dark,
        setDark,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
