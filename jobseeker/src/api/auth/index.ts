import TokenService from "@/services/service-token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { HttpClient } from "../axiosSetup";
import { UserApi } from "../endpoints";
import { useFetch } from "../methods";
import useUpdate from "../methods/update";
import { useMutate } from "./post";
import { RootInterface } from "./response";

export const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

const useRegisterUser = () => {
  return useMutate({
    apiEndpoint: UserApi.register,
  });
};

const useLoginUser = () => {
  return useMutate({
    apiEndpoint: UserApi.login,
  });
};

const useFetchUser = ({ enabled }: { enabled: boolean }) => {
  return useFetch<RootInterface>({
    apiEndpoint: UserApi.me,
    enabled,
  });
};

const useUpdateUser = () => {
  return useUpdate({
    apiEndpoint: UserApi.update,
    inValidateEndpoints: [UserApi.me],
    message: "Profile updated successfully",
  });
};

const useUpdatePassword = () => {
  return useUpdate({
    apiEndpoint: UserApi.changePassword,
    message: "Password updated successfully",
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
  useFetchUser,
  useLoginUser,
  useLogoutUser,
  useRegisterUser,
  useUpdatePassword,
  useUpdateUser,
};
