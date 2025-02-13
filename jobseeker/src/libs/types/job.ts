interface JobTypes {
  title: string;
  tags?: string;
  minSalary: string;
  maxSalary: string;
  education?: string;
  experience?: string;
  jobType: string;
  vacancies: string;
  expiryDate: Date;
  jobLevel: string;
  description?: string;
  responsibilities?: string;
}

export type { JobTypes };
