import { useQueryClient } from '@tanstack/react-query';
import { CreateTaskForm } from '@/components/CreateTaskForm';
import { TaskList } from '@/components/TaskList';

const Index = () => {
  const queryClient = useQueryClient();

  const handleTaskCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Gibwork API Example
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Index;