import { useFetchSavedJobs } from "@/api/function/bookmarks";
import { PaginationButton } from "@/components/Pagination";
import Loader from "@/utils/Loader";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { XCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";

const SavedJobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending } = useFetchSavedJobs({
    perPage: 6,
    page: pageFromUrl,
  });

  useEffect(() => {
    data?.data.count === 0 &&
      navigate(`/profile/saved-jobs?page=${currentPage - 1}`);
  }, [data]);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  return (
    <Flex flexDir={"column"} gap={4}>
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Saved Jobs
      </Text>
      {isPending ? (
        <Loader />
      ) : data && data?.data.count > 0 ? (
        data.data.rows.map((savedJobs) => (
          <Card
            key={savedJobs.id}
            savedJobs={savedJobs}
            pageFromUrl={pageFromUrl}
          />
        ))
      ) : (
        <Stack
          spacing={4}
          align={"center"}
          justify={"center"}
          direction={"column"}
          w={"100%"}
          h={"100%"}
        >
          <Icon as={XCircle} boxSize={20} color={"red.500"} />
          <Text fontSize={"xl"} fontWeight={"bold"}>
            No saved jobs found
          </Text>
          <Text fontSize={"md"} color={"gray.500"}>
            You have not saved any job yet.
          </Text>
        </Stack>
      )}

      {data?.pagination && data?.data?.count > 0 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={data?.pagination?.totalPages}
          setCurrentPage={setCurrentPage}
          renderButtons
        />
      )}
    </Flex>
  );
};

export default SavedJobs;
