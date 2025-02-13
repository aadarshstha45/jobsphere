import TokenService from "@/services/service-token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";
import useUpdate from "../methods/update";
import { UserApi } from "./endpoint";
import { useMutate } from "./post";

export const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

const useRegisterUser = () => {
  return useMutate({
    apiEndPoint: UserApi.register,
  });
};

const useLoginUser = () => {
  return useMutate({
    apiEndPoint: UserApi.login,
  });
};

const initLogout = () => {
  return HttpClient.post(UserApi.logout);
};
const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: initLogout,
    onSuccess: () => {
      TokenService.clearToken();
      queryClient.clear();
      queryClient.setQueryData([authTokenKey], false);
      queryClient.invalidateQueries({ queryKey: [authTokenKey] });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(
        error?.response?.data?.error ??
          "An error occurred. Please try again later"
      );
    },
  });
};

const useChangePassword = () => {
  return useUpdate({
    apiEndPoint: UserApi.changePassword,
    message: "Password changed successfully.",
  });
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    // const tokenInfo = TokenService.getTokenDetails();
    return Promise.resolve(true);
  }
  return Promise.resolve(null);
};
/**
 * Check if user is authenticated
 * @returns boolean
 */

const useAuthentication = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [authTokenKey],
    queryFn: async () => {
      const authStatus = await checkAuthentication();
      const tokenDetails = TokenService.getTokenDetails();
      if (tokenDetails) {
        queryClient.setQueryData([authTokenDetails], {
          ...tokenDetails,
        });
      }
      return authStatus;
    },
    staleTime: 0, // ensures the query is fresh and refetched when invalidated
  });
};

export {
  checkAuthentication,
  useAuthentication,
  useChangePassword,
  useLoginUser,
  useLogoutUser,
  useRegisterUser,
};
