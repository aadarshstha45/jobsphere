import { useFetchJobs } from "@/api/function/jobs";
import BreadCrumb from "@/components/BreadCrumbs/BreadCrumb";
import { SelectInput } from "@/components/Form/Input";
import { PageSizeSelect, PaginationButton } from "@/components/Pagination";
import { pageSize } from "@/libs/options/pageSize";
import { sortOptions } from "@/libs/options/sortOptions";
import Loader from "@/utils/Loader";
import { Container, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import GridLayout from "./GridLayout";

const Job = () => {
  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     search: "",
  //   },
  // });

  const urlParams = new URLSearchParams(window.location.search);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [categoryId, setCategoryId] = useState<string>("");
  const [sort, setSort] = useState("relevance");
  const [companyId, setCompanyId] = useState<string>("");
  const pageFromUrl = urlParams.get("page") || page;
  const categoryIdFromUrl = urlParams.get("categoryId") || categoryId;
  const companyIdFromUrl = urlParams.get("companyId") || companyId;

  useEffect(() => {
    if (companyId) {
      urlParams.set("companyId", companyId);
    }
  }, [companyId]);

  useEffect(() => {
    setCompanyId(companyIdFromUrl);
  }, [companyIdFromUrl]);

  useEffect(() => {
    setCategoryId(categoryIdFromUrl);
  }, [categoryIdFromUrl]);

  useEffect(() => {
    setPage(Number(pageFromUrl));
  }, [pageFromUrl]);

  const {
    data: jobs,
    isPending,
    isFetching,
  } = useFetchJobs({
    perPage,
    page: pageFromUrl,
    sort,
    categoryId: categoryIdFromUrl,
    companyId: companyIdFromUrl,
  });

  useEffect(() => {
    if (companyId) {
      urlParams.set("companyId", companyId);
      history.pushState(
        { search: urlParams.toString() },
        "",
        `?${urlParams.toString()}`
      );
    }
  }, [companyId, history, urlParams]);

  useEffect(() => {
    if (categoryId) {
      urlParams.set("categoryId", categoryId);
      history.pushState(
        { search: urlParams.toString() },
        "",
        `?${urlParams.toString()}`
      );
    }
  }, [categoryId, history, urlParams]);

  useEffect(() => {
    urlParams.set("page", "1");
    window.history.pushState(
      { search: urlParams.toString() },
      "",
      `?${urlParams.toString()}`
    );
    setPage(1);
  }, [perPage, sort]);

  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log({ search });
  }, [search]);

  return (
    <Flex flexDir={"column"} gap={4}>
      {isPending || isFetching ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb heading={"Find Jobs"} />
          {jobs && jobs?.data.count > 0 && (
            <Container
              maxW={{
                base: "98vw",
                sm: "95vw",
                md: "90vw",
                lg: "85vw",
                xl: "75vw",
              }}
            >
              <Flex flexDir={"column"} gap={6}>
                <Flex
                  justify={"space-between"}
                  flexWrap={"wrap-reverse"}
                  gap={2}
                  align={"center"}
                >
                  {/* <Button
                    w={"fit-content"}
                    colorScheme="primary"
                    leftIcon={<SlidersHorizontal />}
                    onClick={onOpen}
                  >
                    Filter
                  </Button> */}
                  {/* <BreadCrumbs /> */}
                  <FilterModal
                    isOpen={isOpen}
                    onClose={onClose}
                    setSearch={setSearch}
                  />
                  <HStack flexWrap={"wrap"}>
                    <SelectInput
                      name="sort"
                      isControlled={false}
                      options={sortOptions}
                      label={"Sort"}
                      width={{ base: "200px", sm: "200px" }}
                      value={sortOptions.find(
                        (option) => option.value === sort
                      )}
                      handleChange={(selectedOption: {
                        label: string;
                        value: string;
                      }) => {
                        setSort(selectedOption.value);
                      }}
                    />
                    <PageSizeSelect
                      pageSize={perPage}
                      setPageSize={setPerPage}
                      options={pageSize}
                      width={{ base: "200px", sm: "150px" }}
                    />
                  </HStack>
                </Flex>
                {/* <Flex
                  align={"center"}
                  borderRadius={30}
                  bg={"gray.100"}
                  p={2}
                  w={"fit-content"}
                >
                  <Text fontSize={"14px"} fontWeight={500}>
                    New York
                  </Text>
                  <Button
                    ml={4}
                    aria-label="Clear Location"
                    bg={"white"}
                    _hover={{ bg: "gray.50" }}
                    p={0}
                    borderRadius={30}
                    size={"xs"}
                  >
                    {<Icon as={X} boxSize={4} />}
                  </Button>
                </Flex> */}
                <GridLayout data={jobs ?? {}} isPending={isPending} />
                {jobs.data.count > 0 && jobs.pagination && (
                  <PaginationButton
                    renderButtons
                    currentPage={page}
                    totalPages={jobs.pagination.totalPages}
                    setCurrentPage={setPage}
                  />
                )}
              </Flex>
            </Container>
          )}
        </>
      )}
    </Flex>
  );
};

export default Job;
