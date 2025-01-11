interface Asset {
  imageUrl: string;
  price: number;
  symbol: string;
}

export interface PaginatedResponse {
  results: Task[];
  lastPage: number;
  page: number;
  limit: number;
  total: number;
}

export interface Task {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  deadline: string;
  asset: Asset;
  assetId: string;
  tags: string[];
}
