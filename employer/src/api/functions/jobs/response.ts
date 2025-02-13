export interface RootInterface {
  data: {
    count: number;
    rows: JobResponse[];
  };
  pagination?: Pagination;
  status?: number;
  statusCode?: number;
  message?: string;
}

export interface SingleDataInterface {
  data: JobResponse;
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

export interface JobResponse {
  id: number;
  tags?: Array<string>;
  title: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  education: string;
  experience: string;
  jobType: string;
  vacancies: number;
  expiryDate: string;
  jobLevel: string;
  category: CategoryData;
  description: string;
  responsibilities: string;
  isActive: boolean;
  postedBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInterface {
  data: {
    count: number;
    rows: CategoryData[];
  };
  pagination?: Pagination;
  status?: number;
  statusCode?: number;
  message?: string;
}

export interface CategoryData {
  id: number;
  name: string;
  isActive: boolean;
}
