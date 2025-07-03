export default function SearchBar({ search, setSearch }) {
  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search tasks..."
      className="w-full border border-gray-200 p-3 rounded-xl backdrop-blur bg-white/40 focus:outline-blue-500"
    />
  );
}
