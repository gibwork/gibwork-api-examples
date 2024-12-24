'use client'

import { useEffect, useState } from 'react'
import { marked } from 'marked';

interface TaskDetail {
  id: string
  title: string
  content: string
  requirements: string
  asset: {
    imageUrl: string
    amount: string
    symbol: string
    price: number
  }
  user: {
    firstName: string
    lastName: string
  }
}

async function fetchTaskDetail(id: string) {
  const url = `https://api2.gib.work/tasks/${id}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch task')
  }
  return response.json()
}

interface taskPops {
    id: string,
}

export default function TaskPage(props: taskPops) {
    const id = props.id
  const [task, setTask] = useState<TaskDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await fetchTaskDetail(id)
        setTask(data)
        setLoading(false)
      } catch (err) {
        setError('Task not found')
        setLoading(false)
      }
    }

    loadTask()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111827] text-purple-400">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111827]">
        <p className="text-red-400">{error || 'No task found'}</p>
      </div>
    )
  }

  const calculateReward = () => {
    const amount = parseFloat(task.asset.amount) / Math.pow(10, 6)
    const priceUSD = task.asset.price
    return {
      tokens: amount.toFixed(2),
      usd: (amount * priceUSD).toFixed(2)
    }
  }

  const reward = calculateReward()

  return (
    <div className="bg-[#111827] text-gray-100 block">
      <div className="mx-auto px-4 py-8">
        <div className="bg-[#1F2937] rounded-lg border border-[#374151]">
          {/* Header Section */}
          <div className="p-6 border-b border-[#374151]">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {task.title}
              </h1>
              <div className="flex items-center space-x-3 bg-[#111827] p-3 rounded-lg border border-[#374151]">
                <img 
                  src={task.asset.imageUrl} 
                  alt="token" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-right">
                  <p className="font-bold text-purple-400">
                    {reward.tokens} {task.asset.symbol}
                  </p>
                  <p className="text-sm text-gray-400">
                    ${task.asset.price.toFixed(3)} USD
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-purple-400">Description</h2>
              <div className="bg-[#111827] rounded-lg p-4 border border-[#374151]">
                <p className="text-gray-300 whitespace-pre-wrap">
                <div
                    className="text-gray-300"
                    dangerouslySetInnerHTML={{ __html: marked(task.content) }}
                    />
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-purple-400">Requirements</h2>
              <div className="bg-[#111827] rounded-lg p-4 border border-[#374151]">
                <p className="text-gray-300">
                  <div
                    className="text-gray-300"
                    dangerouslySetInnerHTML={{ __html: marked(task.requirements) }}
                    />
                </p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-4 border-t border-[#374151] flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Posted by: {' '}
                <span className="text-purple-400">
                  {task.user.firstName} {task.user.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}