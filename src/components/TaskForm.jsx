export default function TaskForm({ setShowForm, addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    if (!title) return alert("Title is required");
    addTask({ title, description });
    e.target.reset();
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-20">
      <form
        onSubmit={handleSubmit}
        className=" bg-white dark:bg-white p-6 md:p-8 space-y-4 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 relative"
      >
        <h2 className="text-xl md:text-2xl font-bold">Add New Task</h2>
        <input
          name="title"
          placeholder="Title"
          required
          className="w-full border border-gray-200 p-3 rounded-xl backdrop-blur bg-white/40"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-200 p-3 rounded-xl backdrop-blur bg-white/40"
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="border px-4 py-2 rounded-xl backdrop-blur bg-gray-200"
          >
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
