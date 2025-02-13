import { BaseURL } from "@/api/axiosSetup";
import { useFetchCompany } from "@/api/function/company";
import NoLogo from "@/assets/images/NoLogo.png";
import BreadCrumb from "@/components/BreadCrumbs/BreadCrumb";
import { teamSizeOptions } from "@/libs/options";
import Loader from "@/utils/Loader";
import {
  Button,
  Container,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  ArrowRight,
  Briefcase,
  CalendarBlank,
  FacebookLogo,
  GlobeSimple,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  PhoneCall,
  Timer,
  TwitterLogo,
  Wallet,
  YoutubeLogo,
} from "@phosphor-icons/react";
import dompurify from "dompurify";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

const CompanyDetails = () => {
  const [isLessThan500] = useMediaQuery("(max-width: 500px)");
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const { data, isPending } = useFetchCompany(id);
  console.log({ data });
  return (
    <Flex flexDir={"column"} gap={4}>
      <BreadCrumb heading={"Employer Detail"} />
      {isPending ? (
        <Loader />
      ) : (
        <Container
          maxW={{
            base: "98vw",
            sm: "95vw",
            md: "90vw",
            lg: "85vw",
            xl: "75vw",
          }}
          py={10}
        >
          <Flex flexDir={"column"} gap={4}>
            <Flex
              justify={"space-between"}
              p={6}
              borderRadius={"12px"}
              border={"1px solid"}
              align={"center"}
              borderColor={"gray.100"}
              flexWrap={"wrap"}
              gap={3}
            >
              <HStack gap={4} align={"start"}>
                <Image
                  src={
                    data?.data.logo ? `${BaseURL}/${data?.data.logo}` : NoLogo
                  }
                  alt={data?.data.name}
                  boxSize={"70px"}
                />

                <Stack gap={0}>
                  <Text fontWeight={500}>{data?.data.name}</Text>
                  <HStack gap={1} align={"start"}>
                    <Icon as={MapPin} boxSize={4} color={"gray.400"} />
                    <Text color={"gray.400"} fontSize={"14px"}>
                      {data?.data.location}
                    </Text>
                  </HStack>
                </Stack>
              </HStack>
              <Button
                rightIcon={<Icon as={ArrowRight} boxSize={5} />}
                variant={"primary"}
                size={{ base: "sm", md: "md" }}
              >
                Open Positions
              </Button>
            </Flex>
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacingX={6}
              spacingY={10}
              w={"full"}
              mt={4}
            >
              <GridItem colSpan={2}>
                <Stack gap={10}>
                  <Stack gap={2}>
                    <Text
                      fontWeight={600}
                      fontSize={{ base: "16px", md: "18px", xl: "20px" }}
                    >
                      About Us
                    </Text>
                    {data?.data?.aboutUs && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dompurify.sanitize(data?.data?.aboutUs),
                        }}
                      ></div>
                    )}
                  </Stack>
                  <Stack gap={2}>
                    <Text
                      fontWeight={600}
                      fontSize={{ base: "16px", md: "18px", xl: "20px" }}
                    >
                      Company Vision
                    </Text>

                    {data?.data?.vision && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dompurify.sanitize(data?.data?.vision),
                        }}
                      ></div>
                    )}
                  </Stack>
                </Stack>
              </GridItem>
              <GridItem colSpan={1}>
                <Flex flexDir={"column"} h={"full"} gap={4}>
                  <Flex
                    flexDir={"column"}
                    gap={4}
                    border={"1px solid"}
                    borderColor={"primary.200"}
                    p={4}
                    w={{ base: "full", sm: "455px", lg: "full" }}
                    borderRadius={8}
                  >
                    <Text fontWeight={600}>Company Overview</Text>
                    <SimpleGrid
                      columns={2}
                      spacingX={{ sm: 10, lg: 2 }}
                      spacingY={isLessThan500 ? 4 : 10}
                    >
                      <GridItem colSpan={1}>
                        <Icon
                          as={CalendarBlank}
                          boxSize={6}
                          color={"primary.500"}
                        />
                        <Text fontSize={"12px"}>Founded</Text>
                        <Text fontWeight={500} fontSize={"14px"}>
                          {moment(data?.data?.yearOfEstablishment).format(
                            "DD MMM, YYYY"
                          )}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Icon as={Timer} boxSize={6} color={"primary.500"} />

                        <Text fontSize={"12px"}>Organization Type</Text>
                        <Text fontWeight={500} fontSize={"14px"}>
                          {data?.data?.organizationType}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Icon as={Wallet} boxSize={6} color={"primary.500"} />

                        <Text fontSize={"12px"}>Team Size</Text>
                        <Text fontWeight={500} fontSize={"14px"}>
                          {
                            teamSizeOptions.find(
                              (option) => option.value === data?.data?.teamSize
                            )?.label
                          }
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Icon
                          as={Briefcase}
                          boxSize={6}
                          color={"primary.500"}
                        />

                        <Text fontSize={"12px"}>Industry Type</Text>
                        <Text fontWeight={500} fontSize={"14px"}>
                          {/* {
                            industryType.find(
                              (option) =>
                                option.value === data?.data?.industryType
                            )?.label
                          } */}
                          {data?.data.industryType}
                        </Text>
                      </GridItem>
                    </SimpleGrid>
                  </Flex>
                  <Flex
                    flexDir={"column"}
                    gap={4}
                    border={"1px solid"}
                    borderColor={"primary.200"}
                    p={4}
                    w={{ base: "full", sm: "455px", lg: "full" }}
                    borderRadius={8}
                  >
                    <Text fontWeight={600}>Contact Information</Text>
                    <HStack
                      gap={4}
                      align={"start"}
                      borderBottom={"1px solid"}
                      borderColor={"gray.200"}
                      pb={4}
                    >
                      <Icon
                        as={GlobeSimple}
                        boxSize={6}
                        color={"primary.500"}
                      />
                      <Stack gap={1}>
                        <Text fontSize={"14px"}>Website</Text>
                        <Text fontWeight={500} fontSize={"14px"}>
                          {data?.data.website}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack
                      gap={4}
                      align={"start"}
                      borderBottom={"1px solid"}
                      borderColor={"gray.200"}
                      pb={4}
                    >
                      <Icon
                        as={PhoneCall}
                        fontWeight="duotone"
                        boxSize={6}
                        color={"primary.500"}
                      />
                      <Stack gap={1}>
                        <Text fontSize={"14px"}>Phone</Text>
                        <Text
                          as={Link}
                          to={`tel:${data?.data.user.email}`}
                          fontWeight={500}
                          fontSize={"14px"}
                        >
                          {data?.data.phone}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack gap={4} align={"start"} pb={1}>
                      <Icon
                        as={PhoneCall}
                        fontWeight="duotone"
                        boxSize={6}
                        color={"primary.500"}
                      />
                      <Stack gap={1} wordBreak={"break-word"}>
                        <Text fontSize={"14px"}>Email</Text>
                        <Text
                          as={Link}
                          to={`mailto:${data?.data.user.email}`}
                          fontWeight={500}
                          fontSize={"14px"}
                        >
                          {data?.data.user.email}
                        </Text>
                      </Stack>
                    </HStack>
                  </Flex>
                  <Flex
                    flexDir={"column"}
                    gap={4}
                    border={"1px solid"}
                    borderColor={"primary.200"}
                    p={4}
                    w={{ base: "full", sm: "455px", lg: "full" }}
                    borderRadius={8}
                  >
                    <Text fontWeight={600}>Follow Us On</Text>
                    <HStack gap={1}>
                      {data?.data?.facebook && (
                        <Button
                          as={"a"}
                          href={data?.data?.facebook}
                          target="_blank"
                          size={"sm"}
                          colorScheme={"facebook"}
                          p={2}
                        >
                          <Icon as={FacebookLogo} boxSize={6} />
                        </Button>
                      )}
                      {data?.data?.linkedin && (
                        <Button
                          as={"a"}
                          href={data?.data?.linkedin}
                          target="_blank"
                          size={"sm"}
                          colorScheme={"linkedin"}
                          p={2}
                        >
                          <Icon as={LinkedinLogo} boxSize={6} />
                        </Button>
                      )}
                      {data?.data?.twitter && (
                        <Button
                          as={"a"}
                          href={data?.data?.twitter}
                          target="_blank"
                          size={"sm"}
                          colorScheme={"twitter"}
                          p={2}
                        >
                          <Icon as={TwitterLogo} boxSize={6} />
                        </Button>
                      )}
                      {data?.data?.instagram && (
                        <Button
                          as={"a"}
                          href={data?.data?.instagram}
                          target="_blank"
                          size={"sm"}
                          colorScheme={"pink"}
                          p={2}
                        >
                          <Icon as={InstagramLogo} boxSize={6} />
                        </Button>
                      )}
                      {data?.data?.youtube && (
                        <Button
                          as={"a"}
                          href={data?.data?.youtube}
                          target="_blank"
                          size={"sm"}
                          colorScheme={"youtube"}
                          p={2}
                        >
                          <Icon as={YoutubeLogo} boxSize={6} />
                        </Button>
                      )}
                    </HStack>
                  </Flex>
                </Flex>
              </GridItem>
            </SimpleGrid>
          </Flex>
        </Container>
      )}
    </Flex>
  );
};

export default CompanyDetails;
