/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  MenuDivider,
  MenuItemOption,
  MenuOptionGroup,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp, Funnel, Plus, X } from "@phosphor-icons/react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Updater,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageSizeSelect, PaginationButton } from "../Pagination";
import { FilterPopover } from "./ActionButton";
import { SearchInput } from "./SearchInput";
export type DataTableProps = {
  data: Record<string, any>[];
  count: number;
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  isFetching?: boolean;
  addButton?: boolean;
  pinColumnAccess?: boolean;
  showFooter?: boolean;
  canFilter?: boolean;
  totalDataLabel?: string;
  filterStatusValue?: string;
  setFilterStatusValue?: Dispatch<SetStateAction<string>>;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    totalRows?: number;
    pageParams?: {
      pageIndex: number;
      pageSize: number;
    };
    onChangePagination?: (paginationData: Updater<PaginationState>) => void;
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
  };
  sortingColumn?: string;
  setTable?: (table: any) => void;
  modalProps?: {
    sticky: boolean;
    height: string;
  };
  noDataMessage?: string;
  footerLeftElement?: ReactElement;
  setFilteredRows?: Dispatch<SetStateAction<any>>;
  searchText?: string;
  setSearchText?: Dispatch<SetStateAction<string>>;
  navigate?: () => void;
  handlePageSize?: (pageSize: number) => void;
};

const filterFunction: FilterFn<any> = (rows, id, value) => {
  const rowValue = String(rows.original[id]).toLowerCase();
  const filterStatusValue = value.toLowerCase();
  return rowValue.includes(filterStatusValue);
};

export default function DataTable({
  data,
  count,
  columns,
  isLoading,
  isFetching,
  filter,
  filterStatusValue,
  setFilterStatusValue,
  navigate,
  pagination,
  setSearchText,
  noDataMessage,
  addButton = true,
  handlePageSize,
  canFilter = true,
}: DataTableProps) {
  const addParams = useNavigate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowSelection, setRowSelection] = useState({});
  const { colorMode } = useColorMode();
  const table = useReactTable({
    columns,
    data,
    enableColumnResizing: true,
    manualPagination: pagination?.manual,
    state: {
      rowSelection,
      columnFilters,
      globalFilter: filter?.globalFilter?.trim(),
      pagination: pagination?.manual
        ? pagination?.pageParams
        : {
            pageIndex: pageIndex,
            pageSize: pageSize,
          },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: filterFunction,
    onGlobalFilterChange: filter?.setGlobalFilter,
  });

  const handleStatusFilter = (value?: boolean) => {
    // Filter for both true (active) and false (inactive) values
    if (setFilterStatusValue) {
      setFilterStatusValue(
        value === true ? "active" : value === false ? "inactive" : ""
      );
    }
    addParams(
      value === true
        ? `?page=1&status=active`
        : value === false
        ? `?page=1&status=inactive`
        : `?page=1`
    );
  };
  const handleReset = () => {
    if (setFilterStatusValue) {
      setFilterStatusValue("");
    }
    addParams(`?page=1`);
  };

  const { control } = useForm();
  return (
    <Flex flexDir={"column"} gap={2}>
      <Flex w={"full"} flexDir={"column"} mt={4}>
        <Flex
          w={"full"}
          justify={"space-between"}
          align={"center"}
          flexWrap={"wrap"}
          gap={4}
          mb={5}
        >
          <Flex gap={2} align={"center"}>
            <SearchInput
              control={control}
              type="text"
              onSearch={setSearchText}
              name="search"
            />
            {canFilter && (
              <FilterPopover icon={<Funnel />}>
                <MenuOptionGroup
                  title="Filter"
                  type="radio"
                  value={filterStatusValue}
                >
                  <MenuItemOption
                    closeOnSelect={true}
                    onClick={() => handleStatusFilter(true)}
                    value="true"
                    bg={filterStatusValue === "active" ? "green.200" : "none"}
                    _hover={{ bg: "green.200" }}
                  >
                    Active
                  </MenuItemOption>
                  <MenuDivider my={0} />
                  <MenuItemOption
                    onClick={() => handleStatusFilter(false)}
                    value="false"
                    _hover={{ bg: "red.200" }}
                    bg={filterStatusValue === "inactive" ? "red.200" : "none"}
                    closeOnSelect={true}
                  >
                    InActive
                  </MenuItemOption>
                </MenuOptionGroup>
              </FilterPopover>
            )}
          </Flex>
          {addButton && (
            <Button
              leftIcon={<Icon as={Plus} textColor="white" />}
              onClick={navigate}
              variant={"primary"}
            >
              Add
            </Button>
          )}
        </Flex>
        {canFilter && (
          <Flex align={"center"} gap={2}>
            {filterStatusValue && filterStatusValue !== "" && (
              <Flex align={"center"} gap={2} mt={4}>
                <Text>Status: </Text>
                <Flex
                  as={Badge}
                  borderRadius={4}
                  gap={2}
                  align={"center"}
                  py={1}
                  px={2}
                  border={
                    filterStatusValue === "active"
                      ? "0.5px solid green"
                      : "1px solid red"
                  }
                  colorScheme={filterStatusValue === "active" ? "green" : "red"}
                >
                  {filterStatusValue === "active" ? "Active" : "Inactive"}
                  <X cursor={"pointer"} onClick={handleReset} />
                </Flex>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
      <Card
        shadow={"none"}
        border={"1px solid var(--chakra-colors-gray-200)"}
        boxShadow={
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)"
        }
        borderRadius={"12px"}
        bg={colorMode === "light" ? "white" : "gray.800"}
        overflow={"hidden"}
      >
        <CardBody p={0}>
          <TableContainer>
            <Table>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <Tr
                      bg={colorMode === "light" ? "gray.50" : "gray.700"}
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <Th
                            color={
                              colorMode === "light" ? "gray.800" : "gray.200"
                            }
                            key={header.id}
                            colSpan={1}
                            onClick={header.column.getToggleSortingHandler()}
                            cursor={header.column.getCanSort() ? "pointer" : ""}
                            p={"12px 24px"}
                            h={"60px"}
                          >
                            <Flex gap={4} align={"center"}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              {header.column.getCanSort() ? (
                                header.column.getIsSorted().valueOf() ===
                                "asc" ? (
                                  <Icon as={ArrowDown} boxSize={5} />
                                ) : header.column.getIsSorted().valueOf() ===
                                  "desc" ? (
                                  <Icon as={ArrowUp} boxSize={5} />
                                ) : null
                              ) : null}
                            </Flex>
                          </Th>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Thead>
              <Tbody>
                {isLoading || isFetching ? (
                  <>
                    {[...Array(5)].map((_row, rowIndex) => (
                      <Tr key={rowIndex}>
                        {columns.map((_column, columnIndex) => (
                          <Td key={columnIndex}>
                            <Skeleton height={"20px"} w={"full"} />
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </>
                ) : (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <Tr
                        _hover={{
                          bg: colorMode === "light" ? "gray.50" : "gray.700",
                        }}
                        key={row.id}
                      >
                        {row.getVisibleCells()?.map((cell) => {
                          return (
                            <Td
                              colSpan={1}
                              borderBottom={
                                "1px solid var(--chakra-colors-gray-200)"
                              }
                              key={cell.id}
                              h={"72px"}
                              align="center"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                )}
                {count === 0 && !isLoading && !isFetching && (
                  <Text py={10} textAlign={"center"}>
                    {noDataMessage ?? "No data available"}
                  </Text>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
        {count > 0 && (
          <CardFooter py={0}>
            <Flex
              w={"full"}
              flexWrap={"wrap"}
              justify={"space-between"}
              align={"center"}
            >
              <Box>
                <Text fontWeight={500} color={"gray.700"}>
                  {pagination?.manual
                    ? `${
                        (pagination?.pageParams?.pageIndex! - 1) *
                          (pagination?.pageParams?.pageSize ?? 10) +
                        1
                      } - ${Math.min(
                        pagination?.pageParams?.pageIndex! *
                          (pagination?.pageParams?.pageSize ?? 10),
                        pagination?.totalRows!
                      )} of ${pagination?.totalRows}`
                    : `${
                        table.getState().pagination.pageIndex *
                          (pageSize ?? 10) +
                        1
                      } - ${Math.min(
                        (table.getState().pagination.pageIndex + 1) *
                          (pageSize ?? 10),
                        table.getRowCount()
                      )} of ${table.getRowCount()}`}
                </Text>
              </Box>
              <Flex
                flexWrap={"wrap"}
                justify={{ base: "space-between", sm: "" }}
                align={"center"}
                gap={2}
                py={5}
              >
                <Flex flexWrap={"wrap"} gap={2} align={"center"}>
                  <PageSizeSelect
                    width="120px"
                    setPageSize={(pageSize: number) => {
                      pagination?.manual
                        ? handlePageSize && handlePageSize(pageSize)
                        : setPageSize(pageSize);
                    }}
                    // menuPlacement="top"
                    options={[
                      { value: 10, label: "10" },
                      { value: 25, label: "25" },
                      { value: 50, label: "50" },
                      { value: 100, label: "100" },
                    ]}
                    pageSize={
                      pagination?.manual
                        ? pagination.pageParams?.pageSize
                        : table.getState().pagination.pageSize
                    }
                  />
                </Flex>
                <ButtonGroup colorScheme="secondary">
                  <PaginationButton
                    currentPage={pagination?.pageParams?.pageIndex || pageIndex}
                    setCurrentPage={setPageIndex}
                    totalPages={pagination?.pageCount || count / pageSize - 1}
                    status={filterStatusValue}
                    size="lg"
                  />
                </ButtonGroup>
              </Flex>
            </Flex>
          </CardFooter>
        )}
      </Card>
    </Flex>
  );
}
