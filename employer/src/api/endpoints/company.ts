interface PaginationProps {
  perPage?: string | number;
  page?: string | number;
  sort?: string;
  categoryId?: string | null;
  companyId?: string | null;
}

export const CompanyApi = {
  getData: "/company/data",
  get: "/company/me",
  update: "/company",
  getApplications: ({ perPage, page }: PaginationProps) =>
    `/company/application?page=${page}&perPage=${perPage}`,
};
