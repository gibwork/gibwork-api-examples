const API_BASE_URL = 'https://api2.gib.work';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
}

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/public/transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': window.location.origin,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/explore`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Origin': window.location.origin,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const data = await response.json();

  // Ensure the 'results' field is an array, and map to the Task structure
  if (!Array.isArray(data.results)) {
    throw new Error('Expected an array of tasks in the "results" field');
  }

  return data.results.map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description || '',  // Default to an empty string if description is missing
    status: task.status,
  }));
};
