/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";

const useDelete = (requestData: {
  apiEndpoint: string;
  inValidateEndpoints?: string[];
  message?: string;
}) => {
  const queryClient = useQueryClient();
  const deleteData = (id: string): Promise<AxiosResponse<any>> => {
    return HttpClient.delete(requestData.apiEndpoint.replace(":id", id));
  };

  return useMutation({
    mutationKey: [requestData.apiEndpoint],
    mutationFn: (id: string) => deleteData(id),
    onSuccess: () => {
      if (requestData.inValidateEndpoints) {
        queryClient.invalidateQueries({
          queryKey: [requestData.inValidateEndpoints],
        });
      }
      toast.success(requestData.message!);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(
        error?.response?.data?.error ??
          "An error occurred. Please try again later"
      );
    },
  });
};
export default useDelete;
