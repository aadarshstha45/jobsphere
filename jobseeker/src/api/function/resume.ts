import { ResumeApi } from "../endpoints";
import { useDelete, useFetch, useMutate } from "../methods";
import useUpdate from "../methods/update";
import { RootInterface, SingleDataInterface } from "../response";
import { ResumeResponse } from "./response";

const useAddResume = () => {
  return useMutate({
    apiEndpoint: ResumeApi.add,
    inValidateEndpoints: [ResumeApi.get],
    message: "Resume added successfully.",
  });
};

const useFetchResume = () => {
  return useFetch<RootInterface<ResumeResponse>>({
    apiEndpoint: ResumeApi.get,
  });
};

const useFetchSingleResume = (id: string) => {
  return useFetch<SingleDataInterface<ResumeResponse>>({
    apiEndpoint: ResumeApi.getOne.replace(":id", id),
    enabled: !!id,
  });
};

const useUpdateResume = () => {
  return useUpdate({
    apiEndpoint: ResumeApi.edit,
    inValidateEndpoints: [ResumeApi.get],
    message: "Resume updated successfully.",
  });
};

const useDeleteResume = () => {
  return useDelete({
    apiEndpoint: ResumeApi.delete,
    inValidateEndpoints: [ResumeApi.get],
    message: "Resume deleted successfully.",
  });
};

export {
  useAddResume,
  useDeleteResume,
  useFetchResume,
  useFetchSingleResume,
  useUpdateResume,
};
