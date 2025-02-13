export enum SalaryType {
  PAID = "paid",
  UNPAID = "unpaid",
  NEGOTIABLE = "negotiable",
}

export enum JobType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  FREELANCE = "freelance",
  VOLUNTEER = "volunteer",
  INTERNSHIP = "internship",
  REMOTE = "remote",
}

export enum JobLevel {
  INTERNSHIP = "internship",
  ENTRY_LEVEL = "entry_level",
  MID_LEVEL = "mid_level",
  SENIOR_LEVEL = "senior_level",
  MANAGEMENT = "management",
  DIRECTOR = "director",
  EXECUTIVE = "executive",
}

export enum ExperienceLevel {
  NO_EXPERIENCE = "no_experience",
  LESS_THAN_1_YEAR = "less_than_1_year",
  ONE_TO_TWO_YEARS = "1_2_years",
  TWO_TO_THREE_YEARS = "2_3_years",
  THREE_TO_FOUR_YEARS = "3_4_years",
  FOUR_TO_FIVE_YEARS = "4_5_years",
  FIVE_TO_SIX_YEARS = "5_6_years",
  SIX_TO_TEN_YEARS = "6_10_years",
  MORE_THAN_10_YEARS = "more_than_10_years",
}

export enum EducationLevel {
  NO_EDUCATION = "no_education",
  HIGH_SCHOOL = "high_school",
  SOME_COLLEGE = "some_college",
  ASSOCIATE_DEGREE = "associate_degree",
  BACHELORS_DEGREE = "bachelors_degree",
  MASTERS_DEGREE = "masters_degree",
  PROFESSIONAL_DEGREE = "professional_degree",
  DOCTORATE = "doctorate",
  OTHER = "other",
}

export interface JobAttributes {
  id?: number;
  title: string;
  salaryType: SalaryType;
  minSalary: number;
  maxSalary: number;
  education: EducationLevel;
  experience: ExperienceLevel;
  jobType: JobType;
  vacancies: number;
  expiryDate: string;
  jobLevel: JobLevel;
  description: string;
  responsibilities: string;
  isActive: boolean;
  postedBy: number;
}

export const JOBENUMS = {
  SalaryType,
  JobType,
  JobLevel,
  ExperienceLevel,
  EducationLevel,
};
