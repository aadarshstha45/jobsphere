/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";

const useDelete = (requestData: {
  apiEndPoint: string;
  inValidateEndpoint?: string;
  message?: string;
}) => {
  const queryClient = useQueryClient();
  const deleteData = (id: string): Promise<AxiosResponse<any>> => {
    return HttpClient.delete(requestData.apiEndPoint.replace(":id", id));
  };

  return useMutation({
    mutationKey: [requestData.apiEndPoint],
    mutationFn: (id: string) => deleteData(id),
    onSuccess: () => {
      if (requestData.inValidateEndpoint) {
        queryClient.invalidateQueries({
          queryKey: [requestData.inValidateEndpoint],
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
