import { CompanyApi } from "../endpoints";
import { useFetch } from "../methods";
import { RootInterface, SingleDataInterface } from "../response";
import { CompanyResponse } from "./response";

const useFetchCompanies = () => {
  return useFetch<RootInterface<CompanyResponse>>({
    apiEndpoint: CompanyApi.getAll,
  });
};

const useFetchCompany = (id: string) => {
  return useFetch<SingleDataInterface<CompanyResponse>>({
    apiEndpoint: CompanyApi.getOne.replace(":id", id),
  });
};

export { useFetchCompanies, useFetchCompany };
