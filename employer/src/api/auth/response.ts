export interface RootInterface {
  id: number;
  name: string;
  userName: string;
  email: string;
  company: Company;
  userType: string;
  createdAt: string;
}

interface Company {
  id: number;
  name: string;
  location: string;
  website: string;
  userId: number;
}
