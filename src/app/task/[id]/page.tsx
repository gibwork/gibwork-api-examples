'use client'
import TaskPage from '../../../components/TaskView'

export default function Page({ params }: { params: { id: string } }) {
    return (
      <main className="container p-4 w-screen mx-auto">
        <h1 className="text-3xl font-bold mb-6">Gibwork API Demo</h1>
        <div className="flex flex-col w-full">
          <TaskPage id={params.id} />
        </div>
      </main>
    )
  }