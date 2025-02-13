import { useFetchApplicationHistory } from "@/api/function/application";
import DataTable from "@/components/Table";
import {
  Badge,
  Button,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewApplication from "../Dashboard/ViewApplication";

const AppliedJobs = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [id, setId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [searchText, setSearchText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const pageFromUrl = urlParams.get("page") || page;
  useEffect(() => {
    setPage(Number(pageFromUrl));
  }, [pageFromUrl]);

  const { data, isPending, isFetching } = useFetchApplicationHistory({
    perPage: perPage,
    page: pageFromUrl,
  });

  const handleDetailOpen = (id: string) => {
    setId(id);
    onOpen();
  };

  const handleClose = () => {
    setId(null);
    onClose();
  };

  const columns = [
    {
      header: "S.N.",
      accessorKey: "sn",
      enableSorting: false,
      cell: ({ row }: any) => {
        return <Text>{perPage * (page - 1) + (row.index + 1)}</Text>;
      },
    },
    {
      header: "Applied For",
      accessorKey: "job.title",
      enableSorting: true,
      cell: ({ row }: any) => {
        return (
          <Stack>
            <ChakraLink
              as={Link}
              to={`/find-job/${row.original.job.id}`}
              color={"primary.500"}
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={500}
            >
              {row.original.job.title}
            </ChakraLink>
          </Stack>
        );
      },
    },

    {
      header: "Job Type",
      accessorKey: "job.jobType",
      enableSorting: true,
      cell: ({ row }: any) => {
        return (
          <Text
            textTransform={"capitalize"}
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight={500}
          >
            {row.original.job.jobType.replace("_", " ")}
          </Text>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }: any) => {
        const { status } = row.original;
        return (
          <Badge
            colorScheme={
              status === "pending"
                ? "yellow"
                : status === "shortlisted"
                ? "blue"
                : status === "accepted"
                ? "green"
                : "red"
            }
            borderRadius={6}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      header: "Applied On",
      accessorKey: "createdAt",
      cell: ({ row }: any) => {
        return (
          <Text fontSize={{ base: "16px", md: "18px" }}>
            {moment(row.original.createdAt).format("DD MMM YYYY")}
          </Text>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      enableSorting: false,
      cell: ({ row }: any) => {
        return (
          <Button
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight={500}
            colorScheme="gray"
            textColor={"primary.500"}
            _hover={{ bg: "primary.500", color: "white" }}
            transition={"all 0.1s"}
            size={"sm"}
            onClick={() => handleDetailOpen(row.original.id)}
            // onClick={() => console.log(row.original.id)}
          >
            View Applications
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data && data?.data.count > 0 ? data?.data.rows : []}
        count={data?.data.count ?? 0}
        addButton={false}
        canFilter={false}
        isFetching={isFetching}
        searchText={searchText}
        filter={{
          globalFilter: searchText,
          setGlobalFilter: setSearchText,
        }}
        noDataMessage="You have not applied for any job yet."
        setSearchText={setSearchText}
        isLoading={isPending}
        pagination={
          data?.pagination
            ? {
                manual: true,
                totalRows: data.pagination.totalRecords,
                pageCount: data.pagination.totalPages,
                pageParams: {
                  pageIndex: data.pagination.currentPage,
                  pageSize: data.pagination.perPage,
                },
              }
            : undefined
        }
        handlePageSize={setPerPage}
      />
      <ViewApplication isOpen={isOpen} onClose={handleClose} id={id!} />
    </>
  );
};

export default AppliedJobs;
