import { BookmarkApi, JobApi } from "../endpoints";
import { useFetch, useMutate } from "../methods";
import { RootInterface } from "../response";
import { BookmarkResponse } from "./response";

interface BookmarkProps {
  perPage: string | number;
  page: string | number;
  sort?: string;
}

const useAddBookmarkJobs = ({
  jobId,
  page,
}: {
  jobId?: string;
  page?: number;
}) => {
  return useMutate({
    apiEndpoint: BookmarkApi.add,
    inValidateEndpoints: [
      BookmarkApi.get,
      BookmarkApi.saved({ perPage: 6, page }),
      JobApi.getOne.replace(":id", jobId ?? ""),
    ],
    showMessage: true,
  });
};

const useFetchBookmarkedJobs = (enabled: boolean) => {
  return useFetch<RootInterface<BookmarkResponse>>({
    apiEndpoint: BookmarkApi.get,
    enabled: enabled ?? false,
  });
};

const useFetchSavedJobs = ({ perPage, page }: BookmarkProps) => {
  return useFetch<RootInterface<BookmarkResponse>>({
    apiEndpoint: BookmarkApi.saved({ perPage, page }),
  });
};

export { useAddBookmarkJobs, useFetchBookmarkedJobs, useFetchSavedJobs };
