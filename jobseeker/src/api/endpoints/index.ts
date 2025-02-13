//User

export const UserApi = {
  register: "/register",
  login: "/login",
  logout: "/logout",
  me: "/jobseeker/me",
  update: "/jobseeker/update",
  changePassword: "/changePassword",
  stats: "/jobseeker/stats",
};

//Data
export const DataApi = {
  count: "/dataCount",
};

//jobs
interface PaginationProps {
  perPage?: string | number;
  page?: string | number;
  sort?: string;
  categoryId?: string | null;
  companyId?: string | null;
  search?: string | null;
}

export const JobApi = {
  getAll: ({
    perPage,
    page,
    sort,
    categoryId,
    companyId,
    search,
  }: PaginationProps) => {
    let url = "/job?";
    page && (url += `page=${page}&`);
    perPage && (url += `perPage=${perPage}&`);
    sort && (url += `sort=${sort}&`);
    categoryId && (url += `categoryId=${categoryId}&`);
    companyId && (url += `companyId=${companyId}&`);
    search && (url += `search=${search}&`);
    return url.slice(0, -1); // Remove the trailing '&'
  },
  getOne: "/job/:id",
  related: "/job/related/:id",
  getCategoriesForHome: "/categoryForHome",
  getCompaniesForHome: "/companiesForHome",
  getJobsForHome: "/jobsForHome",
  getRecommended: "/recommendations",
};

//bookmarks

export const BookmarkApi = {
  get: "/bookmark/jobs",
  saved: ({ perPage, page }: PaginationProps) =>
    `/bookmark/saved?page=${page}&perPage=${perPage}`,
  add: "/bookmark/jobs",
  delete: "/bookmark/:id",
};

//company
export const CompanyApi = {
  getAll: "/company",
  getOne: "/company/:id",
  related: "/relatedCompanies/:id",
};

//UserBehavior

export const UserBehaviorApi = {
  create: "/userBehavior",
};

//Resume

export const ResumeApi = {
  get: "/resume",
  add: "/resume",
  getOne: "/resume/:id",
  edit: "/resume/:id",
  delete: "/resume/:id",
};

//Application

export const ApplicationApi = {
  apply: "/application",
  get: "/application",

  getOne: "/application/:id",
  getRecent: "/application/recent",
  getHistory: ({ perPage, page }: PaginationProps) =>
    `/application/history?page=${page}&perPage=${perPage}`,
  checkStatus: "/application/status",
  delete: "/application/:id",
  getMeetings: ({ perPage, page }: PaginationProps) =>
    `/application/meetings?page=${page}&perPage=${perPage}`,
};
