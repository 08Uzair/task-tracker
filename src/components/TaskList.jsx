import TaskItem from "./TaskItem";

export default function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  if (tasks.length === 0)
    return <p className="text-center text-gray-500 mt-4">No tasks found.</p>;

  return (
<ul className="space-y-2 overflow-y-auto h-[64vh] scroll-smooth pr-6">

      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
