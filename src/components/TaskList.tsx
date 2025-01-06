import { fetchTasks } from '@/lib/api';
import { Task } from '@/types/task';

async function TaskList() {
  const tasks = await fetchTasks();

  if (!tasks?.length) {
    return <div className="text-center py-8">No tasks found</div>;
  }

  return (
    <div className="divide-y">
      {tasks.map((task: Task) => (
        <div key={task.id} className="py-4">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span>Status: {task.status}</span>
            <span className="mx-2">•</span>
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;