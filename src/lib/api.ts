export async function createTask(taskData: {
  title: string;
  content: string;
  requirements: string;
  tags: string[];
  payer: string;
  token: {
    mintAddress: string;
    amount: string;
  };
}) {
  const url = "https://api2.gib.work/tasks/public/transaction";
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      token: {
        mintAddress: taskData.token.mintAddress,
        amount: parseInt(taskData.token.amount, 10),
      },
      title: taskData.title,
      content: taskData.content,
      requirements: taskData.requirements,
      tags: taskData.tags,
      payer: taskData.payer,
    }),
  };
  try {
    const response = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        window.open(`https://app.gib.work/tasks/${json.taskId}`, "_blank");
      })
      .catch((err) => console.error(err));
    alert("Task created successfully");
  } catch (error) {
    console.error("Sending request failed, Error:", error);
  }
}

export async function fetchTasks(
  page: number = 1,
  limit: number = 15
): Promise<PaginatedResponse> {
  const url = `https://api2.gib.work/explore?page=${page}&limit=${limit}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      results: [],
      lastPage: 1,
      page: 1,
      limit: 15,
      total: 0,
    };
  }
}

export async function fetchSearch(id: string) {
  const url = `https://api2.gib.work/tasks/${id}`;
  const options = { method: "GET" };
  try {
    const response = await fetch(url, options)
      .then((json) => json.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error("Error searching:", error);
    return "";
  }
}
