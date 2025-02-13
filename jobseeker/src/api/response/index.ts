export interface RootInterface<T> {
  data: {
    count: number;
    rows: T[];
  };
  pagination?: Pagination;
  status?: number;
  statusCode?: number;
  message?: string;
}

export interface SingleDataInterface<T> {
  data: T;
  status?: number;
  statusCode?: number;
  message?: string;
}

export interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  firstPage: string;
  lastPage: string;
}
