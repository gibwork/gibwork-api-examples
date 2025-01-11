"use client";
import CreateTaskForm from "@/components/CreateTaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gibwork Tasks Create</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateTaskForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
