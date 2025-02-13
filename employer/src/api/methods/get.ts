/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { HttpClient } from "../axiosSetup";

interface UseFetchProps {
  apiEndpoint: string;
  params?: any;
  enabled?: boolean;
}

const useFetch = <T>({ apiEndpoint, params, enabled }: UseFetchProps) => {
  const fetchData = (): Promise<AxiosResponse<T>> => {
    return HttpClient.get(apiEndpoint, {
      params,
    });
  };

  return useQuery({
    queryKey: [apiEndpoint, params],
    queryFn: fetchData,
    select: (response) => response?.data,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    enabled: enabled ?? true,
  });
};

export default useFetch;
