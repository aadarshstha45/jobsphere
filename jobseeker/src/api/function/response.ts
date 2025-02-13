import { JobseekerResponse } from "../auth/response";

export interface DataCountResponse {
  jobseekerCount: number;
  employerCount: number;
  jobCount: number;
  applicationCount: number;
}

export interface StatsResponse {
  applications: number;
  savedJobs: number;
}

export interface RecommendationResponse {
  count: number;
  recommendations: Recommendation[];
}

export interface Recommendation {
  job: JobResponse;
  score: number;
}

//JobResponse
export interface JobResponse {
  id: number;
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
  description: string;
  responsibilities: string;
  isActive: boolean;
  categoryId?: any;
  postedBy: number;
  createdAt: string;
  updatedAt: string;
  company: CompanyResponse;
  category?: CategoryInterface;
  isBookmarked: boolean;
}

export interface CategoryInterface {
  id: number;
  name: string;
  isActive?: boolean;
  jobCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

//CompanyResponse
export interface CompanyResponse {
  id: number;
  name: string;
  aboutUs?: string;
  organizationType?: any;
  industryType?: any;
  yearOfEstablishment?: string;
  teamSize?: string;
  vision?: string;
  phone?: string;
  location: string;
  mapUrl?: string;
  website: string;
  logo?: string;
  facebook?: string;
  instagram?: string;
  twitter?: any;
  youtube?: any;
  linkedin?: any;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: UserResponse;
  jobCount?: number;
  jobs?: JobResponse[];
}

//bookmark response
export interface BookmarkResponse {
  id: number;
  userId: number;
  jobId: number;
  job?: JobResponse;
  createdAt: string;
  updatedAt: string;
}

//UserResponse

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
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
