'use client'

import { useState, useEffect } from 'react'
import { fetchTasks } from '../actions/tasks'
import Image from 'next/image'

interface Task {
  id: string
  title: string
  content: string
  requirements: string
  tags: string[]
  payer: string
  asset: {
    imageUrl: string
    reward: number
    symbol: string
  }
  type: string
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
            console.log('Tasks:', data)
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

  const handleTaskClick = (id: string, type: string) => {
    if(type == 'tasks') {
      window.location.href = `/task/${id}`
      return;
    }
    const url = `https://app.gib.work/${type}/${id}`
    window.open(url, '_blank')
  }

  return (
    <ul className="space-y-4 w-full">
      {tasks.map((task) => (
        <li key={task.id} className="border rounded-lg p-4 w-full cursor-pointer" onClick={() => handleTaskClick(task.id, task.type)}>
          <div className='flex justify-between'>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <div className='flex items-center'>
            <img src={task.asset.imageUrl} alt="token" width={30} height={30} className="rounded-full" />
            <span className="text-lg font-semibold text-green-500 ml-2">{task.asset.reward} {task.asset.symbol}</span>
          </div>
          </div>
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

