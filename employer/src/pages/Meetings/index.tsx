import { useFetchMeetings } from "@/api/functions/application";
import DataTable from "@/components/Table";
import {
  Button,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewApplication from "./ViewApplication";

const Meetings = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [id, setId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const pageFromUrl = urlParams.get("page") || page;
  useEffect(() => {
    setPage(Number(pageFromUrl));
  }, [pageFromUrl]);

  const { data, isPending, isFetching } = useFetchMeetings({
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
              to={`/jobs`}
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
      header: "Meeting Date",
      accessorKey: "meetingTime",
      enableSorting: false,
      cell: ({ row }: any) => {
        const { meetingTime } = row.original;
        return (
          <Text fontSize={{ base: "16px", md: "18px" }} fontWeight={500}>
            {moment(meetingTime).format("DD MMM YYYY, hh:mm A")}
          </Text>
        );
      },
    },

    {
      header: "Meeting Type",
      accessorKey: "meetingType",
      enableSorting: true,
      cell: ({ row }: any) => {
        return (
          <Text
            textTransform={"capitalize"}
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight={500}
          >
            {row.original.meetingType}
          </Text>
        );
      },
    },
    {
      header: "Meeting Link",
      accessorKey: "meetingLink",
      enableSorting: true,
      cell: ({ row }: any) => {
        return (
          <ChakraLink
            href={row.original.meetingLink ?? "#"}
            target="_blank"
            textTransform={"capitalize"}
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight={500}
          >
            {row.original.meetingLink ? "Follow Link" : "N/A"}
          </ChakraLink>
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
        noDataMessage="No meetings found."
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

export default Meetings;
