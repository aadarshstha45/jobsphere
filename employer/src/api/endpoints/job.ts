export const JobApi = {
  create: "/job",
  getCompanyJob: (page: number, perPage: number, status?: string) =>
    `/job/company?page=${page}&perPage=${perPage}${
      status ? `&status=${status}` : ""
    }`,
  getJobById: `/company/job/:id`,
  updateJob: "/job/:id",
  updateJobStatus: "/job/status/:id",
  getRecentJobs: "/job/recent",
  deleteJob: "/job/:id",
  getCategories: "/category",
  getIndustries: "/industry",
};
