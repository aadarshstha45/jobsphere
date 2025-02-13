import { UserResponse } from "../function/response";

export interface RootInterface {
  data: Data;
  status: number;
  statusCode: number;
  message: string;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  jobseeker: JobseekerResponse;
}

export interface JobseekerResponse {
  id: number;
  education?: string;
  experience?: string;
  biography?: string;
  website?: string;
  resume?: any;
  tags: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: string;
  phone: string;
  location?: string;
  facebook?: string;
  instagram?: string;
  twitter?: any;
  youtube?: any;
  linkedin?: any;
  mapUrl?: string;
  socialMedia?: SocialMedia[];
  userId: number;
  user: UserResponse;
  createdAt: string;
  updatedAt: string;
}

export interface SocialMedia {
  type: string;
  url: string;
}
