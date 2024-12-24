import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Home() {
  return (
    <main className="container p-4 w-screen mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gibwork API Demo</h1>
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-semibold mb-4">Explore Tasks</h2>
        <TaskList />
      </div>
    </main>
  )
}
