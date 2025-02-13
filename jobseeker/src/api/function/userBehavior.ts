import { UserBehaviorApi } from "../endpoints";
import { useMutate } from "../methods";

const useCreateUserBehavior = () => {
  return useMutate({
    apiEndpoint: UserBehaviorApi.create,
    showMessage: false,
  });
};

export { useCreateUserBehavior };
