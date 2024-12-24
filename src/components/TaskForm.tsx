'use client'

import { useState } from 'react'
import { createTask } from '../actions/tasks'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'

export default function TaskForm() {
  const { wallet, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [requirements, setRequirements] = useState('')
  const [tags, setTags] = useState('')
  const [payer, setPayer] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [amount, setAmount] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await createTask({
        title,
        content,
        requirements,
        tags: tags.split(',').map(tag => tag.trim()),
        payer,
        mintAddress,
        amount,
      })
      
      const serializedTransaction = Buffer.from(response.serializedTransaction, 'base64')
      const transaction = Transaction.from(serializedTransaction)

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      })

      const confirmation = await connection.confirmTransaction(signature, 'confirmed')
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed to confirm')
      }

      setTitle('')
      setContent('')
      setRequirements('')
      setTags('')
      setPayer('')
      setMintAddress('')
      setAmount(0)
      alert(`Task created successfully! Task ID: ${response.taskId}`)
      window.location.href = '/'
      
    } catch (error) {
      console.error('Error creating task:', error)
      alert('Failed to create task. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-black/10 backdrop-blur-xl rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-white">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-white/80 mb-1">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
                placeholder="e.g. design, development, marketing"
              />
            </div>

            <div>
              <label htmlFor="payer" className="block text-sm font-medium text-white/80 mb-1">
                Payer Address
              </label>
              <input
                type="text"
                id="payer"
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
                placeholder="Enter payer's wallet address"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="mintAddress" className="block text-sm font-medium text-white/80 mb-1">
                Token Mint Address
              </label>
              <input
                type="text"
                id="mintAddress"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
                placeholder="Enter token mint address"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-white/80 mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                min="0"
                step="0.000000001"
                className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
                placeholder="Enter token amount"
              />
            </div>
          </div>
        </div>

        {/* Full Width Fields */}
        <div className="space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-white/80 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
              placeholder="Describe your task in detail"
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-white/80 mb-1">
              Requirements
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white focus:ring-2 focus:ring-[#641AE6] focus:border-[#641AE6] transition-colors placeholder-white/30"
              placeholder="List the requirements for this task"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#641AE6] text-white font-medium rounded-lg hover:bg-[#7938E6] focus:outline-none focus:ring-2 focus:ring-[#641AE6] focus:ring-offset-2 focus:ring-offset-black/10 transition-colors"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}