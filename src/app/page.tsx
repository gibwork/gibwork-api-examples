import { Suspense } from 'react';
import TaskList from '@/components/TaskList';
import CreateTaskForm from '@/components/CreateTaskForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gibwork Tasks Demo</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateTaskForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading tasks...</div>}>
              <TaskList />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}