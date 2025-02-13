import { BaseURL } from "@/api/axiosSetup";
import { useCheckIfApplied } from "@/api/function/application";
import { useAddBookmarkJobs } from "@/api/function/bookmarks";
import { useFetchSingleJob } from "@/api/function/jobs";
import { useCreateUserBehavior } from "@/api/function/userBehavior";
import NoLogo from "@/assets/images/NoLogo.png";
import {
  educationOptions,
  experienceOptions,
  jobLevelOptions,
  jobTypeOptions,
  teamSizeOptions,
} from "@/libs/options";
import TokenService from "@/services/service-token";
import { formatSalary } from "@/utils/formatSalary";
import Loader from "@/utils/Loader";
import {
  Badge,
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
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  BookmarkSimple,
  Briefcase,
  CalendarBlank,
  FacebookLogo,
  InstagramLogo,
  Link,
  LinkedinLogo,
  MapPin,
  Phone,
  Timer,
  TwitterLogo,
  Wallet,
  YoutubeLogo,
} from "@phosphor-icons/react";
import dompurify from "dompurify";
import moment from "moment";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoginModal from "../Auth/LoginModal";
import ApplyModal from "./ApplyModal";
import RelatedJobs from "./RelatedJobs";

const JobDetail = () => {
  const [isLessThan650] = useMediaQuery("(max-width: 650px)");
  const [isLessThan450] = useMediaQuery("(max-width: 450px)");

  const { id } = useParams();

  if (!id) return <Navigate to="/find-job" />;

  const { data, isPending } = useFetchSingleJob(id);

  const { mutateAsync: checkApplication } = useCheckIfApplied();
  const createUserBehavior = useCreateUserBehavior();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isApplyOpen,
    onOpen: onApplyOpen,
    onClose: onApplyClose,
  } = useDisclosure();
  const isAuthenticated = TokenService.isAuthenticated();

  const handleApplyOpen = async () => {
    if (!isAuthenticated) {
      setTimeout(() => {
        onOpen();
      }, 100);
      toast.error("Please login first.");
    } else {
      const applicationExist = await checkApplication({ jobId: id });
      if (applicationExist.data.status === 0) {
        toast.error(applicationExist.data.message);
      } else {
        onApplyOpen();
      }
    }
  };

  const { mutateAsync } = useAddBookmarkJobs({ jobId: id });
  const handleBookmark = async (jobId: number) => {
    if (!isAuthenticated) {
      setTimeout(() => {
        onOpen();
      }, 100);
      toast.error("Please login first.");
    } else {
      await mutateAsync({ jobId });
      await createUserBehavior.mutateAsync({
        action: "bookmark",
        jobId,
        categoryId: data?.data?.category?.id!,
      });
    }
  };

  return isPending ? (
    <Loader />
  ) : (
    <Container
      py={4}
      maxW={{
        base: "98vw",
        sm: "90vw",
        lg: "95vw",
        xl: "85vw",
      }}
    >
      <Flex flexDir={"column"} gap={10}>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={6}
        >
          <Flex
            flexDir={isLessThan650 ? "column" : "row"}
            w={"full"}
            gap={4}
            justify={"space-between"}
          >
            <HStack gap={2} align={"start"}>
              <Image
                src={
                  data?.data?.company?.logo
                    ? `${BaseURL}/${data?.data?.company?.logo}`
                    : NoLogo
                }
                alt={data?.data?.company?.name}
                boxSize={16}
              />
              <Stack gap={1}>
                <HStack gap={2} flexWrap={"wrap"}>
                  <Text
                    fontSize={{ base: "20px", md: "22px", xl: "24px" }}
                    fontWeight={500}
                  >
                    {data?.data?.title}
                  </Text>
                  <Badge borderRadius={10} colorScheme={"primary"}>
                    {
                      jobLevelOptions.find(
                        (option) => option.value === data?.data?.jobLevel
                      )?.label
                    }
                  </Badge>
                </HStack>
                <HStack flexWrap={"wrap"}>
                  <HStack
                    as={RouterLink}
                    to={`${data?.data?.company?.website}`}
                  >
                    <Icon as={Link} color={"primary.500"} boxSize={4} />
                    <Text fontSize={{ base: "12px", md: "14px", xl: "16px" }}>
                      {data?.data?.company?.website}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={Phone} color={"primary.500"} boxSize={4} />
                    <Text fontSize={{ base: "12px", md: "14px", xl: "16px" }}>
                      {data?.data?.company?.phone}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={MapPin} color={"primary.500"} boxSize={4} />
                    <Text fontSize={{ base: "12px", md: "14px", xl: "16px" }}>
                      {data?.data?.company?.location}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </HStack>
            <HStack>
              <Button
                size={isLessThan650 ? "sm" : "md"}
                variant={"outline"}
                p={1}
                onClick={() => handleBookmark((data && data?.data?.id) || 0)}
              >
                <Icon
                  weight={data?.data?.isBookmarked ? "fill" : "regular"}
                  as={BookmarkSimple}
                  boxSize={6}
                />
              </Button>

              <Button
                size={isLessThan650 ? "sm" : "md"}
                variant={"solid"}
                colorScheme={"primary"}
                onClick={handleApplyOpen}
              >
                Apply Now
              </Button>
              <ApplyModal
                isOpen={isApplyOpen}
                onClose={onApplyClose}
                jobId={data?.data?.id!}
                companyId={data?.data?.company?.id!}
                categoryId={data?.data?.category?.id!}
              />
            </HStack>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacingX={4}
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
                    Job Description
                  </Text>
                  {data?.data?.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(data?.data?.description),
                      }}
                    ></div>
                  )}
                </Stack>
                <Stack gap={2}>
                  <Text
                    fontWeight={600}
                    fontSize={{ base: "16px", md: "18px", xl: "20px" }}
                  >
                    Job Responsibilities
                  </Text>

                  {data?.data?.responsibilities && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(
                          data?.data?.responsibilities
                        ),
                      }}
                    ></div>
                  )}
                </Stack>
              </Stack>
            </GridItem>
            <GridItem colSpan={isLessThan450 ? 2 : 1} overflow={"hidden"}>
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
                  <Text fontWeight={600}>Job Overview</Text>
                  <SimpleGrid
                    columns={isLessThan450 ? 1 : isLessThan650 ? 2 : 3}
                    spacingX={{ sm: 10, lg: 2 }}
                    spacingY={isLessThan450 ? 4 : 10}
                  >
                    <GridItem colSpan={1}>
                      <Icon
                        as={CalendarBlank}
                        boxSize={6}
                        color={"primary.500"}
                      />
                      <Text fontSize={"12px"}>Job Posted</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {moment(data?.data?.createdAt).format("DD MMM, YYYY")}
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Icon as={Timer} boxSize={6} color={"primary.500"} />

                      <Text fontSize={"12px"}>Job Expiry</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {moment(data?.data?.expiryDate).format("DD MMM, YYYY")}
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Icon as={Briefcase} boxSize={6} color={"primary.500"} />

                      <Text fontSize={"12px"}>Job Education</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {
                          educationOptions.find(
                            (option) => option.value === data?.data?.education
                          )?.label
                        }
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Icon as={Wallet} boxSize={6} color={"primary.500"} />

                      <Text fontSize={"12px"}>Salary</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {data?.data?.salaryType === "paid"
                          ? `${formatSalary(
                              data?.data?.minSalary
                            )} - ${formatSalary(data?.data?.maxSalary)}`
                          : data?.data?.salaryType}
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Icon as={MapPin} boxSize={6} color={"primary.500"} />

                      <Text fontSize={"12px"}>Location</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {data?.data?.company.location}
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Icon as={Briefcase} boxSize={6} color={"primary.500"} />

                      <Text fontSize={"12px"}>Job Type</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {
                          jobTypeOptions.find(
                            (option) => option.value === data?.data?.jobType
                          )?.label
                        }
                      </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Icon as={Briefcase} boxSize={6} color={"primary.500"} />

                      <Text fontSize={"12px"}>Experience</Text>
                      <Text fontWeight={500} fontSize={"14px"}>
                        {
                          experienceOptions.find(
                            (option) => option.value === data?.data?.experience
                          )?.label
                        }
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
                  <HStack align={"start"} gap={4}>
                    <Image
                      src={
                        data?.data?.company?.logo
                          ? `${BaseURL}/${data?.data?.company?.logo}`
                          : NoLogo
                      }
                      alt={data?.data?.company.name}
                      boxSize={12}
                      borderRadius={5}
                    />
                    <Stack gap={1}>
                      <Text fontWeight={700} fontSize={"14px"}>
                        {data?.data?.company.name}
                      </Text>
                      <Text fontSize={"12px"}>
                        {data?.data?.company.location}
                      </Text>
                    </Stack>
                  </HStack>

                  <HStack
                    fontSize={"14px"}
                    justify={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Text textColor={"gray.500"}>Founded In:</Text>
                    <Text fontWeight={500}>
                      {data?.data?.company?.yearOfEstablishment}
                    </Text>
                  </HStack>
                  <HStack
                    fontSize={"14px"}
                    justify={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Text textColor={"gray.500"}>Organization Type:</Text>
                    <Text fontWeight={500}>
                      {data?.data?.company?.organizationType}
                    </Text>
                  </HStack>
                  <HStack
                    fontSize={"14px"}
                    justify={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Text textColor={"gray.500"}>Company Size:</Text>
                    <Text fontWeight={500}>
                      {
                        teamSizeOptions.find(
                          (option) =>
                            option.value === data?.data?.company?.teamSize
                        )?.label
                      }
                    </Text>
                  </HStack>
                  <HStack
                    fontSize={"14px"}
                    justify={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Text textColor={"gray.500"}>Phone:</Text>
                    <Text
                      as={"a"}
                      href={`tel:${data?.data?.company?.phone}`}
                      fontWeight={500}
                    >
                      {data?.data?.company?.phone}
                    </Text>
                  </HStack>
                  <HStack
                    fontSize={"14px"}
                    justify={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Text textColor={"gray.500"}>Email:</Text>
                    <Text
                      as={"a"}
                      href={`mailto:${data?.data?.company?.user?.email}`}
                      fontWeight={500}
                    >
                      {data?.data?.company?.user?.email}
                    </Text>
                  </HStack>
                  <HStack
                    fontSize={"14px"}
                    justify={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Text textColor={"gray.500"}>Website:</Text>
                    <Text
                      as={"a"}
                      href={`${data?.data?.company?.website}`}
                      target="_blank"
                      fontWeight={500}
                    >
                      {data?.data?.company?.website}
                    </Text>
                  </HStack>
                  <HStack gap={1}>
                    {data?.data?.company?.facebook && (
                      <Button
                        as={"a"}
                        href={data?.data?.company?.facebook}
                        target="_blank"
                        size={"sm"}
                        colorScheme={"facebook"}
                        p={2}
                      >
                        <Icon as={FacebookLogo} boxSize={6} />
                      </Button>
                    )}
                    {data?.data?.company?.linkedin && (
                      <Button
                        as={"a"}
                        href={data?.data?.company?.linkedin}
                        target="_blank"
                        size={"sm"}
                        colorScheme={"linkedin"}
                        p={2}
                      >
                        <Icon as={LinkedinLogo} boxSize={6} />
                      </Button>
                    )}
                    {data?.data?.company?.twitter && (
                      <Button
                        as={"a"}
                        href={data?.data?.company?.twitter}
                        target="_blank"
                        size={"sm"}
                        colorScheme={"twitter"}
                        p={2}
                      >
                        <Icon as={TwitterLogo} boxSize={6} />
                      </Button>
                    )}
                    {data?.data?.company?.instagram && (
                      <Button
                        as={"a"}
                        href={data?.data?.company?.instagram}
                        target="_blank"
                        size={"sm"}
                        colorScheme={"pink"}
                        p={2}
                      >
                        <Icon as={InstagramLogo} boxSize={6} />
                      </Button>
                    )}
                    {data?.data?.company?.youtube && (
                      <Button
                        as={"a"}
                        href={data?.data?.company?.youtube}
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
        <LoginModal isOpen={isOpen} onClose={onClose} />
        <RelatedJobs id={id} />
      </Flex>
    </Container>
  );
};

export default JobDetail;
