export interface Dataset {
  id: number;
  title: string;
  description: string;
  provider: string;
  size: string;
  records: string;
  price: string;
  tags: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'provider' | 'admin';
}

export interface DatasetPurchase {
  id: number;
  datasetId: number;
  userId: number;
  purchaseDate: string;
  price: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
} 