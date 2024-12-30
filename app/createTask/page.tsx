'use client'

import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import * as dotenv from "dotenv"
import { ArrowLeft, Loader } from 'lucide-react'
import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
dotenv.config()

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

export default function TaskForm() {
  const { sendTransaction, publicKey } = useWallet()
  const { connection } = useConnection()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [requirements, setRequirements] = useState('')
  const [tags, setTags] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!publicKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-violet-200 to-violet-300 flex items-center justify-center p-4">
        <Link href="/" className="absolute top-4 left-4">
          <Button variant="outline" size="sm" className="bg-white hover:bg-violet-100 text-violet-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-2xl border border-violet-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-800 text-center">
            Connect Your Wallet
          </h2>
          <p className="text-violet-600 mb-6 text-center">
            Please connect your wallet to create a new task.
          </p>
          <div className="animate-pulse text-violet-400 flex justify-center">
            <Loader className="w-12 h-12" />
          </div>
          <p className="text-sm text-violet-500 mt-4 text-center">
            Use the wallet button in the navigation bar above
          </p>
        </motion.div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Create task transaction
      const response = await fetch('https://api2.gib.work/tasks/public/transaction', {
        method: 'POST',
        headers: {
          'accept':'application/json',
          'Content-Type': 'application/json',
        },
        mode:'cors',
        body: JSON.stringify({
          token: {
            mintAddress,
            amount
          },
          title,
          content,
          requirements,
          tags: tags.split(',').map(tag => tag.trim()),
          payer: publicKey.toString()
        })
      })
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }
  
      const data = await response.json()
      
      // Process transaction
      const serializedTransaction = Buffer.from(data.serializedTransaction, 'base64')
      const transaction = Transaction.from(serializedTransaction)
  
      const signature = await sendTransaction(transaction, connection)
      const getConfirmation = async () => {
        const result = await connection.getSignatureStatus(signature, {
          searchTransactionHistory: true,
        });
        return result.value?.confirmationStatus;
      };
      if(!getConfirmation){
        throw Error("transaction failed ")
      }
      // Success case
      setTitle('')
      setContent('')
      setRequirements('')
      setTags('')
      setMintAddress('')
      setAmount(0)
      alert(`Task created successfully! Task ID: ${data.taskId}`)
      window.location.href = '/exploreTasks'
      
    } catch (error) {
      console.error('Error creating task:', error)
      setError(error instanceof Error ? error.message : 'Failed to create task. Please try again.')
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
          Create New Task
        </motion.h1>
        
        <motion.div 
          variants={fadeIn}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-violet-700 mb-1">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border-violet-300 focus:border-violet-500 focus:ring-violet-500"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-violet-700 mb-1">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                    className="w-full border-violet-300 focus:border-violet-500 focus:ring-violet-500"
                    placeholder="e.g. design, development, marketing"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="mintAddress" className="block text-sm font-medium text-violet-700 mb-1">
                    Token Mint Address
                  </label>
                  <Input
                    id="mintAddress"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.target.value)}
                    required
                    className="w-full border-violet-300 focus:border-violet-500 focus:ring-violet-500"
                    placeholder="Enter token mint address"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-violet-700 mb-1">
                    Amount
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    min="0"
                    step="0.000000001"
                    className="w-full border-violet-300 focus:border-violet-500 focus:ring-violet-500"
                    placeholder="Enter token amount (MINIMUM 10 USDC)"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-violet-700 mb-1">
                Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className="w-full border-violet-300 focus:border-violet-500 focus:ring-violet-500"
                placeholder="Describe your task in detail"
              />
            </div>
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-violet-700 mb-1">
                Requirements
              </label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                required
                rows={4}
                className="w-full border-violet-300 focus:border-violet-500 focus:ring-violet-500"
                placeholder="List the requirements for this task"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-100"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Creating Task...
                  </>
                ) : (
                  'Create Task'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

