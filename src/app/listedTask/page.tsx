"use client"
import { Suspense } from 'react';
import TaskList from '@/components/TaskList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gibwork Tasks Demo</h1>
            <div className="grid gap-8">
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
    </div>
  )
}

export default page
