import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gibwork API Demo</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <TaskForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Explore Tasks</h2>
          <TaskList />
        </div>
      </div>
    </main>
  )
}
