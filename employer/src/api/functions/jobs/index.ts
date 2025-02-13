import { CompanyApi, JobApi } from "@/api/endpoints";
import { useDelete, useMutate } from "@/api/methods";
import useFetch from "@/api/methods/get";
import useUpdate from "@/api/methods/update";
import {
  CategoryInterface,
  RootInterface,
  SingleDataInterface,
} from "./response";

const useAddJob = () => {
  return useMutate({
    apiEndPoint: JobApi.create,
    inValidateEndpoints: [JobApi.getCompanyJob(1, 10)],
    message: "Job Added Successfully",
  });
};

const useFetchCompanyJobs = (
  page: number,
  perPage: number,
  status?: string
) => {
  return useFetch<RootInterface>({
    apiEndpoint: JobApi.getCompanyJob(page, perPage, status),
  });
};

const useFetchRecentJobs = () => {
  return useFetch<RootInterface>({
    apiEndpoint: JobApi.getRecentJobs,
  });
};

const useFetchJobById = (id: string) => {
  return useFetch<SingleDataInterface>({
    apiEndpoint: JobApi.getJobById.replace(":id", id),
    enabled: !!id,
  });
};

const useUpdateJob = () => {
  return useUpdate({
    apiEndPoint: JobApi.updateJob,
    message: "Job Status Updated Successfully",
  });
};

const useFetchJobCategories = () => {
  return useFetch<CategoryInterface>({
    apiEndpoint: JobApi.getCategories,
  });
};

const useFetchIndustries = () => {
  return useFetch<CategoryInterface>({
    apiEndpoint: JobApi.getIndustries,
  });
};

const useUpdateJobStatus = ({
  page,
  perPage,
  status,
}: {
  page: number;
  perPage: number;
  status?: string;
}) => {
  return useUpdate({
    apiEndPoint: JobApi.updateJobStatus,
    inValidateEndpoints: [
      JobApi.getCompanyJob(page, perPage, status),

      JobApi.getRecentJobs,
      CompanyApi.get,
    ],
    message: "Job Status Updated Successfully",
  });
};

const useDeleteRecentJob = () => {
  return useDelete({
    apiEndPoint: JobApi.deleteJob,
    inValidateEndpoint: JobApi.getRecentJobs,
    message: "Job Deleted Successfully",
  });
};

const useDeleteJob = () => {
  return useDelete({
    apiEndPoint: JobApi.deleteJob,
    inValidateEndpoint: JobApi.getCompanyJob(1, 10),
    message: "Job Deleted Successfully",
  });
};

export {
  useAddJob,
  useDeleteJob,
  useDeleteRecentJob,
  useFetchCompanyJobs,
  useFetchIndustries,
  useFetchJobById,
  useFetchJobCategories,
  useFetchRecentJobs,
  useUpdateJob,
  useUpdateJobStatus,
};
