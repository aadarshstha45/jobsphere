import { BaseURL } from "@/api/axiosSetup";
import { useFetchJobApplications } from "@/api/functions/application";
import DataTable from "@/components/Table";
import { Badge, Button, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { DownloadSimple } from "@phosphor-icons/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Applications = () => {
  const { id } = useParams();
  if (!id) {
    return <div> No application found for this job. </div>;
  }
  const columns = [
    {
      header: "S.N.",
      accessorKey: "sn",
      enableSorting: false,
      cell: ({ row }: any) => {
        return <Text>{perPage * (currentPage - 1) + (row.index + 1)}</Text>;
      },
    },
    {
      header: "Applicant Name",
      accessorKey: "name",
      enableSorting: true,
      cell: ({ row }: any) => {
        console.log(row.original);
        return (
          <Stack>
            <Text fontSize={{ base: "16px", md: "18px" }} fontWeight={500}>
              {row.original.jobseeker.user.name}
            </Text>
          </Stack>
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
          >
            {status}
          </Badge>
        );
      },
    },
    {
      header: "Resume",
      accessorKey: "resume.resume",
      enableSorting: false,
      cell: ({ row }: any) => {
        return (
          <Button
            as={Link}
            target="_blank"
            href={`${BaseURL}/${row.original.resume.resume}`}
            colorScheme="gray"
            textColor={"primary.500"}
            _hover={{ bg: "primary.500", color: "white" }}
            transition={"all 0.1s"}
            size={"sm"}
          >
            <Icon as={DownloadSimple} boxSize={5} />
          </Button>
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
            colorScheme="gray"
            textColor={"primary.500"}
            _hover={{ bg: "primary.500", color: "white" }}
            transition={"all 0.1s"}
            onClick={() => {
              navigate(`${row.original.id}`);
            }}
            size={"sm"}
          >
            View
          </Button>
        );
      },
    },
  ];

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const statusFromUrl = urlParams.get("status") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterStatusValue, setFilterStatusValue] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, isPending, isFetching } = useFetchJobApplications(id);
  console.log({ data });
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    if (statusFromUrl) {
      setFilterStatusValue(statusFromUrl);
    }
  }, [statusFromUrl]);

  return (
    <>
      <DataTable
        filterStatusValue={filterStatusValue}
        setFilterStatusValue={setFilterStatusValue}
        filter={{
          globalFilter: searchText,
          setGlobalFilter: setSearchText,
        }}
        addButton={false}
        canFilter={false}
        searchText={searchText}
        setSearchText={setSearchText}
        data={data?.data?.rows || []}
        count={data?.data?.count || 0}
        columns={columns}
        navigate={() => navigate("create")}
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
        isFetching={isFetching}
        isLoading={isPending}
      />
    </>
  );
};

export default Applications;
