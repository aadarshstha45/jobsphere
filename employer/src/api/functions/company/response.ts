export interface RootInterface {
  data: CompanyResponse;
  status: number;
  statusCode: number;
  message: string;
}

export interface CompanyResponse {
  id: number;
  name: string;
  aboutUs?: any;
  organizationType?: any;
  industry: IndustryType;
  yearOfEstablishment?: any;
  vision?: any;
  tags?: string;
  phone?: any;
  location: string;
  website: string;
  logo: string;
  userId: number;
  socialMedia: SocialMedia[];
  teamSize?: string;
  createdAt: string;
  updatedAt: string;
  mapUrl?: string;
  user: User;
  jobCount?: number;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  userType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IndustryType {
  id: number;
  name: string;
}

export interface SocialMedia {
  type: string;
  url: string;
}
