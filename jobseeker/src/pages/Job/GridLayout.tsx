import Loader from "@/utils/Loader";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { BaseURL } from "@/api/axiosSetup";
import {
  useAddBookmarkJobs,
  useFetchBookmarkedJobs,
} from "@/api/function/bookmarks";
import { JobResponse } from "@/api/function/response";
import { useCreateUserBehavior } from "@/api/function/userBehavior";
import { RootInterface } from "@/api/response";
import NoLogo from "@/assets/images/NoLogo.png";
import { jobTypeOptions } from "@/libs/options";
import TokenService from "@/services/service-token";
import { formatSalary } from "@/utils/formatSalary";
import {
  BookmarkSimple,
  CalendarBlank,
  CurrencyDollar,
  MapPin,
} from "@phosphor-icons/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginModal from "../Auth/LoginModal";
interface JobProps {
  data: RootInterface<JobResponse>;
  isPending: boolean;
}

const GridLayout = ({ data: jobs, isPending }: JobProps) => {
  const isAuthenticated = TokenService.isAuthenticated();
  const createUserBehavior = useCreateUserBehavior();
  const { mutateAsync } = useAddBookmarkJobs({});
  const { data } = useFetchBookmarkedJobs(isAuthenticated);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleBookmark = async (jobId: number) => {
    if (isAuthenticated) {
      await mutateAsync({ jobId });
      await createUserBehavior.mutateAsync({
        action: "bookmark",
        jobId,
        categoryId: jobs.data.rows.find((job) => job.id === jobId)?.categoryId,
      });
    } else {
      toast.error("Please login to bookmark job");
      onOpen();
    }
  };

  return isPending ? (
    <Loader />
  ) : jobs && jobs?.data.count > 0 ? (
    <SimpleGrid
      spacing={{ base: 5, md: 10 }}
      columns={{ base: 1, sm: 2, lg: 3 }}
    >
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {jobs.data.rows.map((job) => (
        <GridItem key={job.id} colSpan={1}>
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
                        job.company.logo
                          ? `${BaseURL}/${job.company.logo}`
                          : NoLogo
                      }
                      alt={job.company.name}
                      boxSize={12}
                    />
                  </Box>
                  <Stack gap={2}>
                    <Text fontSize={{ base: "12px", md: "14px", xl: "16px" }}>
                      {job.company.name}
                    </Text>
                    <HStack>
                      <Icon as={MapPin} boxSize={4} />
                      <Text fontSize={{ base: "12px", md: "14px", xl: "16px" }}>
                        {job.company.location}
                      </Text>
                    </HStack>
                  </Stack>
                </HStack>
                <Button
                  variant={"outline"}
                  aria-label={"bookmark"}
                  size={"sm"}
                  p={1}
                  onClick={() => handleBookmark(job.id)}
                >
                  <Icon
                    as={BookmarkSimple}
                    weight={
                      data?.data?.rows?.find(
                        (bookmark) => bookmark.jobId === job.id
                      )
                        ? "fill"
                        : "regular"
                    }
                    boxSize={6}
                  />
                </Button>
              </HStack>
            </CardHeader>
            <CardBody pt={4}>
              <Stack gap={2}>
                <Text
                  fontWeight={600}
                  fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                >
                  {job.title}
                </Text>
                <Text
                  fontSize={{ base: "12px", sm: "14px" }}
                  fontWeight={500}
                  whiteSpace={"nowrap"}
                >
                  {
                    jobTypeOptions.find(
                      (option) => option.value === job.jobType
                    )?.label
                  }
                </Text>
                <HStack gap={1}>
                  <Icon as={CalendarBlank} boxSize={4} />
                  <Text
                    fontSize={{ base: "12px", sm: "14px" }}
                    whiteSpace={"nowrap"}
                  >
                    {moment(job.expiryDate)
                      .from(job.createdAt)
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
                    {job.salaryType === "paid"
                      ? `${formatSalary(job.minSalary)} - ${formatSalary(
                          job.maxSalary
                        )}`
                      : job.salaryType}
                  </Text>
                </HStack>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                as={Link}
                to={`/find-job/${job.id}`}
                variant={"outline"}
                colorScheme={"primary"}
                size={"sm"}
                w={"full"}
                onClick={() => {
                  createUserBehavior.mutate({
                    action: "view",
                    jobId: job.id,
                    categoryId: job.categoryId,
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
  ) : (
    <div>No Jobs Found</div>
  );
};

export default GridLayout;
