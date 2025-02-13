import { UserApi } from "../endpoints";
import { useFetch } from "../methods";
import { SingleDataInterface } from "../response";
import { StatsResponse } from "./response";

const useFetchStats = () => {
  return useFetch<SingleDataInterface<StatsResponse>>({
    apiEndpoint: UserApi.stats,
  });
};

export { useFetchStats };
