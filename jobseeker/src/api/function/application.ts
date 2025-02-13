import { ApplicationApi } from "../endpoints";
import { useFetch, useMutate } from "../methods";
import { RootInterface, SingleDataInterface } from "../response";
import { ApplicationResponse } from "./response";

interface ApplicationProps {
  perPage: string | number;
  page: string | number;
  sort?: string;
}

const useAddApplication = () => {
  return useMutate({
    apiEndpoint: ApplicationApi.apply,
    inValidateEndpoints: [ApplicationApi.get],
    message: "Application submitted successfully",
  });
};

const useFetchRecentApplications = () => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getRecent,
  });
};

const useFetchApplicationDetail = ({ id }: { id: string }) => {
  return useFetch<SingleDataInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getOne.replace(":id", id),
    enabled: !!id,
  });
};

const useCheckIfApplied = () => {
  return useMutate({
    apiEndpoint: ApplicationApi.checkStatus,
    showMessage: true,
  });
};
const useFetchApplicationHistory = ({ perPage, page }: ApplicationProps) => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getHistory({ perPage, page }),
  });
};

const useFetchMeetings = ({ perPage, page }: ApplicationProps) => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getMeetings({ perPage, page }),
  });
};

export {
  useAddApplication,
  useCheckIfApplied,
  useFetchApplicationDetail,
  useFetchApplicationHistory,
  useFetchMeetings,
  useFetchRecentApplications,
};
