/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";

const useMutate = (requestData: {
  apiEndpoint: string;
  inValidateEndpoints?: string[];
  showMessage?: boolean;
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
      if (!requestData.showMessage && requestData.message) {
        toast.success(requestData.message);
      } else if (requestData.showMessage && !requestData.message) {
        toast.success(response.data.message);
      }
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(
        !requestData.showMessage
          ? null
          : error?.response?.data?.error ??
              "An error occurred. Please try again later"
      );
    },
  });
};

export default useMutate;
