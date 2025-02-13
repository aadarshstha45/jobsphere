import { BaseURL } from "@/api/axiosSetup";
import { useFetchRecommendedJobs } from "@/api/function/jobs";
import { useCreateUserBehavior } from "@/api/function/userBehavior";
import NoLogo from "@/assets/images/NoLogo.png";
import { jobTypeOptions } from "@/libs/options";
import { formatSalary } from "@/utils/formatSalary";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CalendarBlank, CurrencyDollar, MapPin } from "@phosphor-icons/react";
import moment from "moment";
import { Link } from "react-router-dom";

const Recommended = () => {
  const createUserBehavior = useCreateUserBehavior();

  const { data: recommendedJobs } = useFetchRecommendedJobs();
  console.log(recommendedJobs);
  if (recommendedJobs?.count === 0) return null;
  return (
    recommendedJobs?.count &&
    recommendedJobs.count > 0 && (
      <Container
        maxW={{ base: "100vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
        py={10}
      >
        <Flex flexDir={"column"} gap={6}>
          <Text as="h2" textStyle={"heading"}>
            Just For You
          </Text>
          <SimpleGrid
            spacing={{ base: 5, md: 10 }}
            columns={{ base: 1, sm: 2, lg: 3 }}
          >
            {recommendedJobs?.recommendations.map((item) => (
              <GridItem key={item.job.id} colSpan={1}>
                <Card
                  variant={"outline"}
                  shadow={"sm"}
                  borderRadius={12}
                  border={"0.5px solid"}
                  borderColor={"gray.200"}
                  _hover={{
                    transform: "scale(1.02)",
                    transition: "all 0.3s",
                    borderColor: "primary.500",
                    shadow: "lg",
                  }}
                >
                  <CardHeader py={4}>
                    <HStack align={"start"} justify={"space-between"}>
                      <HStack gap={4} align={"start"}>
                        <Box borderRadius={5} overflow={"hidden"}>
                          <Image
                            src={
                              item.job.company.logo
                                ? `${BaseURL}/${item.job.company.logo}`
                                : NoLogo
                            }
                            alt={item.job.company.name}
                            boxSize={12}
                          />
                        </Box>
                        <Stack gap={2}>
                          <Text
                            fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                          >
                            {item.job.company.name}
                          </Text>
                          <HStack>
                            <Icon as={MapPin} boxSize={4} />
                            <Text
                              fontSize={{
                                base: "12px",
                                md: "14px",
                                xl: "16px",
                              }}
                            >
                              {item.job.company.location}
                            </Text>
                          </HStack>
                        </Stack>
                      </HStack>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={4}>
                    <Stack gap={2}>
                      <Text
                        fontWeight={600}
                        fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                      >
                        {item.job.title}
                      </Text>
                      <Text
                        fontSize={{ base: "12px", sm: "14px" }}
                        fontWeight={500}
                        whiteSpace={"nowrap"}
                      >
                        {
                          jobTypeOptions.find(
                            (option) => option.value === item.job.jobType
                          )?.label
                        }
                      </Text>
                      <HStack gap={1}>
                        <Icon as={CalendarBlank} boxSize={4} />
                        <Text
                          fontSize={{ base: "12px", sm: "14px" }}
                          whiteSpace={"nowrap"}
                        >
                          {moment(item.job.expiryDate)
                            .from(item.job.createdAt)
                            .replace("in ", "")}
                        </Text>
                      </HStack>
                      <HStack gap={1} align={"center"}>
                        <Icon as={CurrencyDollar} boxSize={4} />
                        <Text
                          whiteSpace={"nowrap"}
                          textTransform={"capitalize"}
                          fontSize={{ base: "12px", sm: "14px" }}
                        >
                          {item.job.salaryType === "paid"
                            ? `${formatSalary(
                                item.job.minSalary
                              )} - ${formatSalary(item.job.maxSalary)}`
                            : item.job.salaryType}
                        </Text>
                      </HStack>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <Button
                      as={Link}
                      to={`/find-job/${item.job.id}`}
                      variant={"outline"}
                      colorScheme={"primary"}
                      size={"sm"}
                      w={"full"}
                      onClick={() => {
                        createUserBehavior.mutate({
                          action: "view",
                          jobId: item.job.id,
                          categoryId: item.job.categoryId,
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </SimpleGrid>
        </Flex>
      </Container>
    )
  );
};

export default Recommended;
