import { useFetchRelatedJobs } from "@/api/function/jobs";
import { jobTypeOptions } from "@/libs/options";
import { formatSalary } from "@/utils/formatSalary";
import {
  Card,
  CardHeader,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MapPin } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const RelatedJobs = ({ id }: { id: string }) => {
  if (!id) return null;
  const navigate = useNavigate();
  const { data } = useFetchRelatedJobs(id);

  return (
    data &&
    data.data.count > 0 && (
      <>
        <Divider />

        <Flex flexDir={"column"} gap={4}>
          <Text
            fontSize={{ base: "20px", sm: "22px", md: "24px", lg: "26px" }}
            fontWeight={500}
          >
            Related Jobs
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
            {data?.data?.rows.map((job) => (
              <GridItem key={job.id} colSpan={1}>
                <Card
                  shadow={"none"}
                  border={"1px solid"}
                  borderRadius={8}
                  borderColor={"gray.100"}
                  h={"full"}
                  _hover={{
                    transform: "scale(1.02)",
                    transition: "all 0.3s",
                    borderColor: "primary.200",
                    shadow: "sm",
                  }}
                  cursor={"pointer"}
                  onClick={() => navigate(`/find-job/${job.id}`)}
                >
                  <CardHeader gap={4}>
                    <Flex flexDir={"column"} gap={4}>
                      <HStack gap={2} align={"start"}>
                        <Image
                          src={job.company.logo}
                          alt={job.company.name}
                          boxSize={12}
                        />
                        <Stack spacing={1} align={"start"}>
                          <Text fontWeight={500} fontSize={"14px"}>
                            {job.company.name}
                          </Text>
                          <HStack spacing={1} align={"center"}>
                            <Icon as={MapPin} boxSize={4} />
                            <Text fontSize={"12px"}>
                              {job.company.location}
                            </Text>
                          </HStack>
                        </Stack>
                      </HStack>
                      <Stack spacing={1}>
                        <Text noOfLines={1} fontSize={"18px"} fontWeight={500}>
                          {job.title}
                        </Text>
                        <Text fontSize={"14px"} color={"gray.500"}>
                          {
                            jobTypeOptions.find(
                              (type) => type.value === job.jobType
                            )?.label
                          }
                        </Text>
                        <Text
                          textTransform={"capitalize"}
                          fontSize={"14px"}
                          color={"gray.500"}
                        >
                          {job?.salaryType === "paid"
                            ? `${formatSalary(job?.minSalary)} - ${formatSalary(
                                job?.maxSalary
                              )}`
                            : job?.salaryType}
                        </Text>
                      </Stack>
                    </Flex>
                  </CardHeader>
                </Card>
              </GridItem>
            ))}
          </SimpleGrid>
        </Flex>
      </>
    )
  );
};

export default RelatedJobs;
