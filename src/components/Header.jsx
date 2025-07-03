export default function Header({ username, setDark, dark, setShowForm }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">Hi {username}, Your Tasks</h1>
      <div className="space-x-2">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 shadow"
        >
          + Add Task
        </button>
        <button
          onClick={() => setDark((prev) => !prev)}
          className="border px-4 py-2 rounded-xl backdrop-blur bg-white/20 hover:bg-white/30"
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}
