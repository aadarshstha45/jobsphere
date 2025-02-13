import { CompanyApi } from "@/api/endpoints";
import { useFetch } from "@/api/methods";
import useUpdate from "@/api/methods/update";
import { RootInterface } from "./response";

interface ApplicationProps {
  perPage: string | number;
  page: string | number;
  sort?: string;
}

const useUpdateCompany = () => {
  return useUpdate({
    apiEndPoint: CompanyApi.update,
    inValidateEndpoints: [CompanyApi.get],
    message: "Company updated successfully",
  });
};

const useFetchUserCompany = () => {
  return useFetch<RootInterface>({
    apiEndpoint: CompanyApi.get,
  });
};

export { useFetchUserCompany, useUpdateCompany };
