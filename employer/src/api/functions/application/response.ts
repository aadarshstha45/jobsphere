import { CompanyResponse } from "../company/response";
import { JobResponse } from "../jobs/response";

export interface RootInterface<T> {
  data: {
    count: number;
    rows: T[];
  };
  pagination?: Pagination;
  status: number;
  statusCode: number;
  message?: string;
  error?: string;
}

export interface SingleDataInterface<T> {
  data: T;
  status: number;
  statusCode: number;
  message?: string;
  error?: string;
}

export interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  firstPage: string;
  lastPage: string;
}

// ResumeResponse
export interface ResumeResponse {
  id: number;
  title: string;
  resume: string;
  jobseekerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationResponse {
  id: number;
  status: string;
  coverLetter: string;
  jobId: number;
  createdAt: string;
  updatedAt: string;
  company: CompanyResponse;
  job: JobResponse;
  resume: ResumeResponse;
  jobseeker: JobseekerResponse;
}

export interface Resume {
  id: number;
  title: string;
  resume: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobseekerResponse {
  id: number;
  education?: string;
  experience?: string;
  biography?: string;
  website?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: string;
  phone: string;
  mapUrl?: string;
  facebook?: string;
  twitter?: string;
  location?: string;
  linkedin?: string;
  instagram?: string;
  user?: User;
  youtube?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
