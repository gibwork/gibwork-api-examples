import { Task } from "@/types/task";

export async function createTask(taskData: Partial<Task>) {
  const url = "https://api2.gib.work/tasks/public";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": "Qi4lcBh9j91AUTGFa3HnB4FiBXdBLcIad944yr57",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}

export async function fetchTasks(page: number = 1, limit: number = 15): Promise<PaginatedResponse> {
  const url = `https://api2.gib.work/explore?page=${page}&limit=${limit}`;  
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {
      results: [],
      lastPage: 1,
      page: 1,
      limit: 15,
      total: 0
    };
  }
}
