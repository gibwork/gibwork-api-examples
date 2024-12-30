'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Loader } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

interface Bounty {
  id: string
  status: string
  title: string
  type: string
  deadline: string
  user: {
    firstName: string
    lastName: string
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function TaskExplorer() {
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [taskId, setTaskId] = useState('')
  const [taskResult, setTaskResult] = useState<Bounty | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingBounties, setLoadingBounties] = useState(true)

  useEffect(() => {
    const fetchBounties = async () => {
      setLoadingBounties(true)
      try {
        const response = await fetch('https://api2.gib.work/explore')
        const data = await response.json()
        setBounties(data.results)
      } catch (err) {
        console.error('Error fetching bounties:', err)
        setError('Failed to fetch bounties. Please try again later.')
      } finally {
        setLoadingBounties(false)
      }
    }

    fetchBounties()
  }, [])

  const searchTask = async () => {
    if (!taskId.trim()) return

    setLoading(true)
    setError(null)
    setTaskResult(null)

    try {
      const response = await fetch(`https://api2.gib.work/tasks/${taskId}`, {
        headers: {
          // Add any required authentication headers here
        },
      })
      if (!response.ok) {
        throw new Error('Task not found')
      }
      const data = await response.json()
      setTaskResult({
        id: data.id,
        status: data.status,
        title: data.title,
        type: data.type,
        deadline: data.deadline,
        user: {
          firstName: data.user.firstName,
          lastName: data.user.lastName
        }
      })
    } catch (err) {
      console.error('Error searching task:', err)
      setError('Failed to find task. Please check the ID and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-violet-200 to-violet-300">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto p-8"
      >
        <Link href="/" className="inline-block mb-6">
          <Button variant="outline" size="sm" className="bg-white hover:bg-violet-100 text-violet-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <motion.h1 
          className="text-4xl font-bold mb-8 text-violet-800 text-center"
          variants={slideIn}
        >
          Task Explorer
        </motion.h1>
        
        <motion.div 
          className="mb-12 bg-white p-6 rounded-lg shadow-lg"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-4 text-violet-700">Search Task by ID</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Task ID"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="border-violet-300 focus:border-violet-500 focus:ring-violet-500"
            />
            <Button 
              onClick={searchTask} 
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {taskResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 border border-violet-200 rounded-md bg-violet-50"
            >
              <h3 className="font-semibold mb-2 text-violet-700">Task Result:</h3>
              <Table>
                <TableHeader>
                  <TableRow className="bg-violet-100">
                    <TableHead className="text-violet-700">ID</TableHead>
                    <TableHead className="text-violet-700">Type</TableHead>
                    <TableHead className="text-violet-700">Name</TableHead>
                    <TableHead className="text-violet-700">Title</TableHead>
                    <TableHead className="text-violet-700">End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-violet-50">
                    <TableCell>{taskResult.id}</TableCell>
                    <TableCell>{taskResult.type}</TableCell>
                    <TableCell>{`${taskResult.user.firstName} ${taskResult.user.lastName}`}</TableCell>
                    <TableCell>{taskResult.title}</TableCell>
                    <TableCell>{formatDate(taskResult.deadline)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-violet-700">Bounties</h2>
          {loadingBounties ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-8 h-8 text-violet-600 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-violet-100">
                    <TableHead className="text-violet-700">ID</TableHead>
                    <TableHead className="text-violet-700">Type</TableHead>
                    <TableHead className="text-violet-700">Name</TableHead>
                    <TableHead className="text-violet-700">Title</TableHead>
                    <TableHead className="text-violet-700">End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bounties.map((bounty, index) => (
                    <motion.tr 
                      key={bounty.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-violet-50"
                    >
                      <TableCell>{bounty.id}</TableCell>
                      <TableCell>{bounty.type}</TableCell>
                      <TableCell>{`${bounty.user.firstName} ${bounty.user.lastName}`}</TableCell>
                      <TableCell>{bounty.title}</TableCell>
                      <TableCell>{formatDate(bounty.deadline)}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

