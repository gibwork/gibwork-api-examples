'use client'

import { useState, useEffect } from 'react'
import { fetchTasks } from '../actions/tasks'

interface Task {
  id: string
  title: string
  content: string
  requirements: string
  tags: string[]
  payer: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        fetchTasks().then((data) => {
            setTasks(data.results || [])
            setLoading(false)
        })
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  if (loading) {
    return <div>Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <div>No tasks available.</div>
  }

  return (
    <ul className="space-y-4 w-full">
      {tasks.map((task) => (
        <li key={task.id} className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.content}</p>
          <div className="mt-2">
            {task.tags.map((tag) => (
              <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Payer: {task.user.firstName} {task.user.lastName}</p>
        </li>
      ))}
    </ul>
  )
}

