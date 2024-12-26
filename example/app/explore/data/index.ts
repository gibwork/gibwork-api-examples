// Interface for the "asset" object
interface TaskAsset {
    reward: number;
    symbol: string;
}

// Interface for individual task
export interface Task {
    id: string;
    title: string;
    createdAt: string; // ISO string
    type: string;
    deadline: string; // ISO string
    asset: TaskAsset;
    status: string;
}

// Interface for the API response
export interface TasksResponse {
    results: Task[];
    lastPage: number; // Total pages available
}
