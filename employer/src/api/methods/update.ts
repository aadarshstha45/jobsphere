/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";

const useUpdate = (requestData: {
  apiEndPoint: string;
  inValidateEndpoints?: string[];
  message?: string;
}) => {
  const queryClient = useQueryClient();
  const updateData = ({
    id,
    data,
  }: {
    id: string;
    data: any;
  }): Promise<AxiosResponse<any>> => {
    return HttpClient.patch(requestData.apiEndPoint.replace(":id", id), data);
  };

  return useMutation({
    mutationKey: [requestData.apiEndPoint],
    mutationFn: updateData,
    onSuccess: () => {
      if (requestData.inValidateEndpoints) {
        requestData.inValidateEndpoints.forEach((endpoint) => {
          queryClient.invalidateQueries({
            queryKey: [endpoint],
          });
        });
      }
      if (requestData.message) {
        toast.success(requestData.message);
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
export default useUpdate;
