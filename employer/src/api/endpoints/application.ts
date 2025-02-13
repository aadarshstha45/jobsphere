interface PaginationProps {
  perPage?: string | number;
  page?: string | number;
  sort?: string;
  categoryId?: string | null;
  companyId?: string | null;
}

export const ApplicationApi = {
  getApplications: "/application",
  getJobApplications: "/application/job/:id",
  getApplicationDetail: "application/:id",
  updateApplication: "application/:id",
  getMeetings: ({ perPage, page }: PaginationProps) =>
    `/application/meetings?page=${page}&perPage=${perPage}`,
  getShortlisted: ({ perPage, page }: PaginationProps) =>
    `/application/shortlisted?page=${page}&perPage=${perPage}`,
};
