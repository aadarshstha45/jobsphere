import { DataApi, JobApi } from "../endpoints";
import { useFetch } from "../methods";
import { RootInterface, SingleDataInterface } from "../response";
import {
  CategoryInterface,
  CompanyResponse,
  DataCountResponse,
  JobResponse,
} from "./response";

const useFetchDataCount = () => {
  return useFetch<SingleDataInterface<DataCountResponse>>({
    apiEndpoint: DataApi.count,
  });
};

const useFetchCategoriesForHome = () => {
  return useFetch<RootInterface<CategoryInterface>>({
    apiEndpoint: JobApi.getCategoriesForHome,
  });
};

const useFetchCompaniesForHome = () => {
  return useFetch<RootInterface<CompanyResponse>>({
    apiEndpoint: JobApi.getCompaniesForHome,
  });
};

const useFetchJobsForHome = () => {
  return useFetch<RootInterface<JobResponse>>({
    apiEndpoint: JobApi.getJobsForHome,
  });
};

export {
  useFetchCategoriesForHome,
  useFetchCompaniesForHome,
  useFetchDataCount,
  useFetchJobsForHome,
};
