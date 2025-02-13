import { BaseURL } from "@/api/axiosSetup";
import { useFetchCompanies } from "@/api/function/company";
import NoLogo from "@/assets/images/NoLogo.png";
import BreadCrumb from "@/components/BreadCrumbs/BreadCrumb";
import Loader from "@/utils/Loader";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MapPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Employer = () => {
  const { data, isPending } = useFetchCompanies();
  console.log({ data });
  return (
    <Flex flexDir={"column"} gap={4}>
      {isPending ? (
        <Loader />
      ) : data && data?.data.count > 0 ? (
        <>
          <BreadCrumb heading={"Find Employers"} />
          <Container
            maxW={{
              base: "98vw",
              sm: "95vw",
              md: "90vw",
              lg: "85vw",
              xl: "75vw",
            }}
          >
            <SimpleGrid columns={[1, 2, 3]} gap={4} w={"100%"}>
              {data?.data.rows.map((company) => (
                <Card
                  border={"1px solid"}
                  borderRadius={"12px"}
                  borderColor={"gray.100"}
                  _hover={{
                    borderColor: "primary.500",
                    transform: "scale(1.02)",
                  }}
                  transition={"all 0.3s ease"}
                  key={company.id}
                  shadow={"none"}
                >
                  <CardHeader fontSize={"18px"} fontWeight={500}>
                    <HStack gap={4} align={"start"}>
                      <Image
                        src={
                          company.logo ? `${BaseURL}/${company.logo}` : NoLogo
                        }
                        alt={company.name}
                        boxSize={"50px"}
                      />

                      <Stack gap={0}>
                        <Text noOfLines={1} fontWeight={500}>
                          {company.name}
                        </Text>
                        <HStack gap={1} align={"start"}>
                          <Icon as={MapPin} boxSize={4} color={"gray.400"} />
                          <Text
                            noOfLines={1}
                            color={"gray.400"}
                            fontSize={"14px"}
                          >
                            {company.location}
                          </Text>
                        </HStack>
                        {company.jobs && company.jobs?.length > 0 && (
                          <Badge
                            w={"fit-content"}
                            borderRadius={5}
                            colorScheme={"green"}
                            fontWeight={500}
                            textTransform={"capitalize"}
                          >
                            Hiring Now
                          </Badge>
                        )}
                      </Stack>
                    </HStack>
                  </CardHeader>
                  <CardBody fontSize={"14px"}>
                    {company.jobs && company.jobs?.length > 0 && (
                      <Button
                        as={Link}
                        to={`/find-job?companyId=${company.id}`}
                        w={"full"}
                        colorScheme={"primary"}
                        variant={"outline"}
                        size={"sm"}
                      >
                        Open Positions ({company.jobs && company.jobs.length})
                      </Button>
                    )}
                    <Button
                      as={Link}
                      to={`/find-employers/${company.id}`}
                      w={"full"}
                      mt={2}
                      colorScheme={"primary"}
                      variant={"outline"}
                      size={"sm"}
                    >
                      View Company Details
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </>
      ) : (
        <Text>No Employers Found</Text>
      )}
    </Flex>
  );
};

export default Employer;
