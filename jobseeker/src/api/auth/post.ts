/* eslint-disable @typescript-eslint/no-explicit-any */
import TokenService from "@/services/service-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";

export const authTokenKey = "authToken";

const useMutate = (requestData: {
  apiEndpoint: string;
  inValidateEndpoints?: string[];
  message?: string;
}) => {
  const queryClient = useQueryClient();
  const sendData = (data: any): Promise<AxiosResponse<any>> => {
    return HttpClient.post(requestData.apiEndpoint, data);
  };

  return useMutation({
    mutationKey: [requestData.apiEndpoint],
    mutationFn: sendData,
    onSuccess: (response) => {
      if (requestData.inValidateEndpoints) {
        requestData.inValidateEndpoints.forEach((endpoint) => {
          queryClient.invalidateQueries({
            queryKey: [endpoint],
          });
        });
      }
      if (response.data?.token) {
        const token = { token: response.data.token as string };
        TokenService.setToken(token);
        queryClient.setQueryData([authTokenKey], () => true);
      }

      if (requestData.message) {
        toast.success(requestData.message!);
      }
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(
        error?.response?.data?.error ??
          "An error occurred. Please try again later"
      );
    },
  });
};

export { useMutate };
