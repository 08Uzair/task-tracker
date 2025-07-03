export default function FilterTabs({ filter, setFilter, tasks }) {
  const tabs = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => {
        const count = tasks.filter(
          (t) =>
            tab.value === "all" ||
            (tab.value === "completed" && t.completed) ||
            (tab.value === "pending" && !t.completed)
        ).length;

        return (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3 py-1 rounded shadow ${
              filter === tab.value
                ? "bg-blue-500 text-white"
                : "border border-white/30 backdrop-blur bg-white/20"
            }`}
          >
            {tab.label} ({count})
          </button>
        );
      })}
    </div>
  );
}
