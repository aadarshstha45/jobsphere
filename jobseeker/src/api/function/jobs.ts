import { JobApi } from "../endpoints";
import { useFetch } from "../methods";
import { RootInterface, SingleDataInterface } from "../response";
import { JobResponse, RecommendationResponse } from "./response";

interface JobProps {
  perPage: string | number;
  page: string | number;
  sort?: string;
  categoryId?: string | null;
  companyId?: string | null;
  search?: string | null;
}

const useFetchJobs = ({
  perPage,
  page,
  sort,
  categoryId,
  companyId,
  search,
}: JobProps) => {
  return useFetch<RootInterface<JobResponse>>({
    apiEndpoint: JobApi.getAll({
      perPage,
      page,
      sort,
      categoryId,
      companyId,
      search,
    }),
  });
};

const useFetchSingleJob = (id: string) => {
  return useFetch<SingleDataInterface<JobResponse>>({
    apiEndpoint: JobApi.getOne.replace(":id", id),
  });
};

const useFetchRelatedJobs = (id: string) => {
  return useFetch<RootInterface<JobResponse>>({
    apiEndpoint: JobApi.related.replace(":id", id),
  });
};

const useFetchRecommendedJobs = () => {
  return useFetch<RecommendationResponse>({
    apiEndpoint: JobApi.getRecommended,
  });
};

export {
  useFetchJobs,
  useFetchRecommendedJobs,
  useFetchRelatedJobs,
  useFetchSingleJob,
};
