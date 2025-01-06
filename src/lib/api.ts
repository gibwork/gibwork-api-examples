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

export async function fetchTasks() {
  const url = "https://api2.gib.work/explore";
  const options = { method: "GET", headers: { accept: "application/json" } };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    })
    .catch((err) => console.error(err));
}
