import { useFetchRecentApplications } from "@/api/function/application";
import { jobLevelOptions } from "@/libs/options";
import { tableCSS } from "@/utils/CSS";
import {
  Badge,
  Button,
  Link as ChakraLink,
  HStack,
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
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import ViewApplication from "./ViewApplication";

const TableHeads = [
  "S.N",
  "Job",
  "Job Level",
  "Date Applied",
  "Status",
  "Actions",
];

const Applications = () => {
  const { data, isPending } = useFetchRecentApplications();
  const [id, setId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDetailOpen = (id: string) => {
    setId(id);
    onOpen();
  };

  const handleClose = () => {
    setId(null);
    onClose();
  };

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
              data.data.rows.map((application, index) => (
                // <Tr>
                //   <Td>
                //     <Stack>
                //       <Text
                //         fontSize={{ base: "14px", md: "16px" }}
                //         fontWeight={500}
                //       >
                //         Job Title
                //       </Text>
                //       <Text
                //         fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                //         textTransform={"capitalize"}
                //         color="gray.500"
                //       >
                //         Job Type
                //       </Text>
                //     </Stack>
                //   </Td>
                // </Tr>
                <Tr
                  color={"primary.500"}
                  _hover={{ bg: "primary.50" }}
                  key={application.id}
                >
                  <Td>
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={500}
                    >
                      {index + 1}
                    </Text>
                  </Td>

                  <Td>
                    <Stack>
                      <ChakraLink
                        as={Link}
                        to={`/find-job/${application.job.id}`}
                        fontSize={{ base: "14px", md: "16px" }}
                        fontWeight={500}
                      >
                        {application.job.title}
                      </ChakraLink>
                      <Text
                        fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                        textTransform={"capitalize"}
                        color="gray.500"
                      >
                        {application.job.jobType.replace("_", " ")}
                      </Text>
                    </Stack>
                  </Td>
                  <Td>
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={500}
                    >
                      {
                        jobLevelOptions.find(
                          (label) => label.value === application.job.jobLevel
                        )?.label
                      }
                    </Text>
                  </Td>
                  <Td fontSize={{ base: "14px", md: "16px" }} fontWeight={500}>
                    {moment(application.createdAt).format("DD MMM YYYY")}
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        application.status === "pending"
                          ? "yellow"
                          : application.status === "shortlisted"
                          ? "blue"
                          : application.status === "accepted"
                          ? "green"
                          : "red"
                      }
                      borderRadius={6}
                    >
                      {application.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <Button
                        fontSize={{ base: "14px", md: "16px" }}
                        fontWeight={500}
                        colorScheme="gray"
                        textColor={"primary.500"}
                        _hover={{ bg: "primary.500", color: "white" }}
                        transition={"all 0.1s"}
                        size={"sm"}
                        onClick={() =>
                          handleDetailOpen(application.id.toString())
                        }
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
      <ViewApplication isOpen={isOpen} onClose={handleClose} id={id!} />
      {!isPending && !data?.data && (
        <Text
          fontSize={{ base: "16px", md: "18px", xl: "20px" }}
          fontWeight={600}
          color={"gray.500"}
          textAlign={"center"}
          mt={4}
        >
          You have not applied to any job yet.
        </Text>
      )}
    </>
  );
};

export default Applications;
