import { useFetchRecentJobs } from "@/api/functions/jobs";
import { tableCSS } from "@/utils/CSS";
import {
  Button,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Users } from "@phosphor-icons/react";
import moment from "moment";

const TableHeads = ["Job Title", "Posted On", "Applications", "Actions"];

const JobTable = () => {
  const { data, isPending } = useFetchRecentJobs();
  return (
    <>
      <TableContainer sx={tableCSS}>
        <Table colorScheme="primary">
          <Thead>
            <Tr bg={"gray.50"}>
              {TableHeads.map((head, index) => (
                <Th color={"primary.500"} key={index} py={4}>
                  {head}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isPending ? (
              <>
                {[...Array(5)].map((_row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {[...Array(TableHeads.length)].map(
                      (_column, columnIndex) => (
                        <Td key={columnIndex}>
                          <Skeleton height={"20px"} w={"full"} />
                        </Td>
                      )
                    )}
                  </Tr>
                ))}
              </>
            ) : (
              data &&
              data.data.count !== 0 &&
              data.data.rows.map((job) => (
                <Tr
                  color={"primary.500"}
                  _hover={{ bg: "primary.50" }}
                  key={job.id}
                >
                  <Td>
                    <Stack>
                      <Text
                        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
                        fontWeight={500}
                      >
                        {job.title}
                      </Text>
                      <Text
                        fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                        textTransform={"capitalize"}
                        color="gray.500"
                      >
                        {job.jobType.replace("_", " ")}
                      </Text>
                    </Stack>
                  </Td>
                  <Td
                    fontSize={{ base: "14px", md: "16px", xl: "18px" }}
                    fontWeight={500}
                  >
                    {moment(job.createdAt).format("DD MMM YYYY")}
                  </Td>
                  <Td>
                    <HStack align={"center"}>
                      <Icon as={Users} boxSize={6} />
                      <Text
                        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
                        fontWeight={500}
                      >
                        0
                      </Text>
                      <Text
                        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
                        fontWeight={500}
                      >
                        Applications
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack>
                      <Button
                        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
                        fontWeight={500}
                        colorScheme="gray"
                        textColor={"primary.500"}
                        _hover={{ bg: "primary.500", color: "white" }}
                        transition={"all 0.1s"}
                        size={"sm"}
                      >
                        View Applications
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {!isPending && !data?.data && (
        <Text
          fontSize={{ base: "16px", md: "18px", xl: "20px" }}
          fontWeight={600}
          color={"gray.500"}
          textAlign={"center"}
          mt={4}
        >
          No Jobs Found
        </Text>
      )}
    </>
  );
};

export default JobTable;
