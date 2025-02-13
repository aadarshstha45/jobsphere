import { CompanyApi } from "@/api/endpoints";
import { ApplicationApi } from "@/api/endpoints/application";
import { useFetch } from "@/api/methods";
import useUpdate from "@/api/methods/update";
import {
  ApplicationResponse,
  RootInterface,
  SingleDataInterface,
} from "./response";

interface ApplicationProps {
  perPage: string | number;
  page: string | number;
  sort?: string;
}

const useFetchApplications = () => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getApplications,
  });
};

const useFetchJobApplications = (id: string) => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getJobApplications.replace(":id", id),
  });
};

const useFetchApplicationDetail = (id: string) => {
  return useFetch<SingleDataInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getApplicationDetail.replace(":id", id),
    enabled: !!id,
  });
};

const useUpdateApplication = (id: string) => {
  return useUpdate({
    apiEndPoint: ApplicationApi.updateApplication.replace(":id", id),
    inValidateEndpoints: [
      ApplicationApi.getApplicationDetail.replace(":id", id),
    ],
    message: "Application updated successfully",
  });
};

const useFetchMeetings = ({ perPage, page }: ApplicationProps) => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getMeetings({ perPage, page }),
  });
};

const useFetchShortListed = ({ perPage, page }: ApplicationProps) => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: ApplicationApi.getShortlisted({ perPage, page }),
  });
};

const useFetchAllApplications = ({ perPage, page }: ApplicationProps) => {
  return useFetch<RootInterface<ApplicationResponse>>({
    apiEndpoint: CompanyApi.getApplications({ perPage, page }),
  });
};

export {
  useFetchAllApplications,
  useFetchApplicationDetail,
  useFetchApplications,
  useFetchJobApplications,
  useFetchMeetings,
  useFetchShortListed,
  useUpdateApplication,
};
