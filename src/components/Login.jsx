import { useState } from "react";

export default function Login({ setUsername }) {
  const [input, setInput] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (input.trim().length < 2) return alert("Enter at least 2 characters");
    setUsername(input.trim());
    localStorage.setItem("username", input.trim());
  };

  return (
    <form
      onSubmit={handleLogin}
      className="relative z-10 backdrop-blur-lg bg-white/30 dark:bg-white/20 p-8 md:p-10 space-y-6 rounded-3xl shadow-2xl border border-white/30 w-[90%] max-w-lg h-[60vh] text-center  flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl font-bold">Welcome to Task Tracker</h1>
      <p className="text-white dark:text-gray-600">Enter your name to begin</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        minLength={2}
        placeholder="Your Name"
        className="w-full border border-white/30 p-3 rounded-xl bg-white/50 backdrop-blur focus:outline-blue-500"
      />
      <button className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 shadow-lg">
        Enter
      </button>
    </form>
  );
}
