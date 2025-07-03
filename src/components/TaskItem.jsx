import { useState } from "react";

export default function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    if (editedTitle.trim() === "") return;
    editTask(task.id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <li
      className={`p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow border ${
        task.completed
          ? "bg-green-200/30 backdrop-blur border-green-400/30"
          : "bg-white/30 backdrop-blur border-white/30"
      }`}
    >
      <div className="flex-1 w-full">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border rounded w-full p-2 text-sm"
              placeholder="Title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border rounded w-full p-2 text-sm"
              placeholder="Description"
            />
            <div className="space-x-2 mt-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-lg">{task.title}</h2>
            {task.description && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Created: {new Date(task.createdAt).toLocaleString()}
            </p>
          </>
        )}
      </div>

      <div className="space-x-3 flex items-center">
        {/* Complete Checkbox */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="sr-only peer"
          />
          <div className="w-5 h-5 rounded border border-gray-400 peer-checked:border-green-500 peer-checked:bg-green-500 transition-colors duration-300 flex items-center justify-center">
            <svg
              className={`w-3 h-3 text-white transform transition-transform duration-300 ${
                task.completed ? "scale-100" : "scale-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </label>

        {/* Edit Icon */}
        <button
          onClick={() => setIsEditing(true)}
          className="text-green-500 hover:text-green-700 transition-transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-pencil-icon lucide-pencil"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>

        {/* Delete Icon */}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash2-icon lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      </div>
    </li>
  );
}
