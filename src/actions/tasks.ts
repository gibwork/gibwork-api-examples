'use server'

import { revalidatePath } from 'next/cache'

interface CreateTaskInput {
  title: string
  content: string
  requirements: string
  tags: string[]
  payer: string
  mintAddress: string
  amount: number
}

export async function createTask(input: CreateTaskInput) {
  const url = 'https://api2.gib.work/tasks/public/transaction'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      title: input.title,
      content: input.content,
      requirements: input.requirements,
      tags: input.tags,
      payer: input.payer,
      token: {
        mintAddress: input.mintAddress,
        amount: input.amount,
      } // Add the appropriate token object here
    }),
  })

  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to create task')
  }

  const data = await response.json()
  console.log(data);
  revalidatePath('/')
  return data
}

export async function fetchTasks(page = 1, limit = 10) {
    console.log('fetching tasks')
  const url = `https://api2.gib.work/explore?page=${page}&limit=${limit}`
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json()
}
