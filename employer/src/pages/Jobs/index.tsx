import { useFetchCompanyJobs, useUpdateJobStatus } from "@/api/functions/jobs";
import DeleteAlert from "@/components/Form/Modal/DeleteAlert";
import DataTable from "@/components/Table";
import { ActionColumn } from "@/components/Table/Columns";
import {
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Jobs = () => {
  const [id, setId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExpired, setIsExpired] = useState(false);

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
      header: " Title",
      accessorKey: "title",
      enableSorting: true,
      cell: ({ row }: any) => {
        return (
          <Stack>
            <Text fontSize={{ base: "16px", md: "18px" }} fontWeight={500}>
              {row.original.title}
            </Text>
            <Text
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
              textTransform={"capitalize"}
              color="gray.500"
            >
              {row.original.jobType.replace("_", " ")}
            </Text>
          </Stack>
        );
      },
    },
    {
      header: "Salary",
      accessorKey: "salary",
      enableSorting: true,
      cell: ({ row }: any) => {
        const { minSalary, maxSalary, salaryType } = row.original;
        return (
          <Text
            textTransform={"capitalize"}
            fontSize={{ base: "16px", md: "18px" }}
          >
            {salaryType === "paid"
              ? `$${minSalary} - $${maxSalary}`
              : salaryType}
          </Text>
        );
      },
    },

    {
      header: "Expires In",
      accessorKey: "expiryDate",
      enableSorting: false,
      cell: ({ row }: any) => {
        return (
          <Text fontSize={{ base: "16px", md: "18px" }}>
            {moment(row.original.expiryDate)
              .from(row.original.createdAt)
              .replace("in ", "")}
          </Text>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "isActive",
      enableSorting: false,
      cell: ({ row }: any) => {
        const { isActive } = row.original;
        return (
          <HStack color={isActive ? "success.500" : "red.500"}>
            <Icon as={isActive ? CheckCircle : XCircle} boxSize={5} />
            <Text fontSize={{ base: "16px", md: "18px" }} fontWeight={500}>
              {isActive ? "Active" : "Expired"}
            </Text>
          </HStack>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      enableSorting: false,

      cell: ({ row }: any) => {
        return (
          <HStack>
            <Button
              colorScheme="gray"
              textColor={"primary.500"}
              _hover={{ bg: "primary.500", color: "white" }}
              transition={"all 0.1s"}
              onClick={() => {
                navigate(`${row.original.id}/applications`);
              }}
              size={"sm"}
            >
              View Applications
            </Button>
            <ActionColumn
              deleteLabel="Mark as Expired"
              viewLabel="View Details"
              editLabel="Edit Details"
              onView={() => {
                console.log(`Viewing ${row.original.id}`);
              }}
              onEdit={() => {
                navigate(`edit/${row.original.id}`);
              }}
              onDelete={() => {
                setId(row.original.id);
                setIsExpired(!row.original.isActive);
                onOpen();
              }}
            />
          </HStack>
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

  const { data, isPending, isFetching } = useFetchCompanyJobs(
    pageFromUrl,
    perPage,
    statusFromUrl
  );

  const expireJob = useUpdateJobStatus({
    page: currentPage,
    perPage,
    status: filterStatusValue,
  });

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    if (statusFromUrl) {
      setFilterStatusValue(statusFromUrl);
    }
  }, [statusFromUrl]);

  useEffect(() => {
    console.log({ isExpired });
  }, [isExpired]);

  const handleDeleteJob = async () => {
    if (!id) return;

    console.log({ id, isExpired });

    isExpired
      ? toast.error("Job is already expired")
      : await expireJob.mutateAsync({
          id: id!,
          data: { isActive: false },
        });
    onClose();
  };

  return (
    <>
      <DataTable
        filterStatusValue={filterStatusValue}
        setFilterStatusValue={setFilterStatusValue}
        filter={{
          globalFilter: searchText,
          setGlobalFilter: setSearchText,
        }}
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

      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        heading="Expire Job?"
        message="Are you sure you want to expire this job?"
        onDelete={handleDeleteJob}
        isDeleting={expireJob.isPending}
        deleteLabel="Expire Job"
      />
    </>
  );
};

export default Jobs;
