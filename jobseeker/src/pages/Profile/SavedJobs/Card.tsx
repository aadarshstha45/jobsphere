import { BookmarkResponse } from "@/api/function/response";
import NoLogo from "@/assets/images/NoLogo.png";
import {
  Button,
  Link as ChakraLink,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { BaseURL } from "@/api/axiosSetup";
import { useCheckIfApplied } from "@/api/function/application";
import { useAddBookmarkJobs } from "@/api/function/bookmarks";
import ApplyModal from "@/pages/Job/ApplyModal";
import { formatSalary } from "@/utils/formatSalary";
import {
  BookmarkSimple,
  CalendarBlank,
  CurrencyDollar,
  MapPin,
  XCircle,
} from "@phosphor-icons/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface CardProps {
  savedJobs: BookmarkResponse;
  pageFromUrl: number;
}

const Card = ({ savedJobs, pageFromUrl }: CardProps) => {
  const { mutateAsync } = useAddBookmarkJobs({ jobId: "", page: pageFromUrl });
  const { mutateAsync: checkApplication } = useCheckIfApplied();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleApplyOpen = async () => {
    const applicationExist = await checkApplication({ jobId: savedJobs.jobId });
    if (applicationExist.data.status === 0) {
      toast.error(applicationExist.data.message);
    } else {
      onOpen();
    }
  };

  const handleBookmark = async (jobId: number) => {
    await mutateAsync({ jobId });
  };

  return (
    <Stack>
      <HStack
        justify={"space-between"}
        border={"1px solid transparent"}
        borderBottom={"1px solid var(--chakra-colors-gray-100)"}
        p={"20px"}
        spacing={4}
        flexWrap={"wrap"}
        _hover={{
          border: "1px solid var(--chakra-colors-primary-500)",
          borderRadius: "10px",
          transform: "scale(1.01)",
          transition: "all 0.3s",
        }}
      >
        <HStack align={"start"}>
          <Image
            src={
              savedJobs?.job?.company?.logo
                ? ` ${BaseURL}/${savedJobs.job?.company?.logo}`
                : NoLogo
            }
            alt={savedJobs?.job?.company?.name}
            boxSize={12}
          />
          <Stack>
            <HStack flexWrap={"wrap"}>
              <ChakraLink
                as={Link}
                to={`/find-job/${savedJobs?.job?.id}`}
                fontSize={"lg"}
                fontWeight={500}
              >
                {savedJobs.job?.title}
              </ChakraLink>
              {savedJobs.job?.jobType && (
                <Flex
                  bg={"primary.50"}
                  borderRadius={"63px"}
                  p={"3px 12px"}
                  align={"center"}
                >
                  <Text
                    textTransform={"capitalize"}
                    fontSize={"sm"}
                    fontWeight={500}
                  >
                    {savedJobs.job?.jobType.replace("_", " ") ?? ""}
                  </Text>
                </Flex>
              )}
            </HStack>
            <HStack gap={4} flexWrap={"wrap"}>
              <HStack>
                <Icon as={MapPin} boxSize={4} color={"gray.500"} />
                <Text
                  noOfLines={1}
                  color={"gray.500"}
                  fontSize={{ base: "12px", sm: "14px" }}
                >
                  {savedJobs.job?.company?.location}
                </Text>
              </HStack>
              <HStack>
                <Icon as={CurrencyDollar} boxSize={4} color={"gray.500"} />
                <Text
                  whiteSpace={"nowrap"}
                  textTransform={"capitalize"}
                  color={"gray.500"}
                  fontSize={{ base: "12px", sm: "14px" }}
                >
                  {savedJobs?.job?.salaryType === "paid"
                    ? `${formatSalary(
                        savedJobs?.job?.minSalary
                      )} - ${formatSalary(savedJobs?.job?.maxSalary)}`
                    : savedJobs?.job?.salaryType}
                </Text>
              </HStack>
              <HStack>
                <Icon
                  as={
                    savedJobs?.job?.expiryDate &&
                    new Date(savedJobs.job.expiryDate) <= new Date()
                      ? XCircle
                      : CalendarBlank
                  }
                  boxSize={4}
                  color={
                    savedJobs?.job?.expiryDate &&
                    moment(savedJobs.job.expiryDate).isAfter(moment())
                      ? moment(savedJobs.job.expiryDate).diff(
                          moment(),
                          "days"
                        ) <= 3
                        ? "yellow.500"
                        : "gray.500"
                      : "red.500"
                  }
                />
                <Text
                  whiteSpace={"nowrap"}
                  color={
                    savedJobs?.job?.expiryDate &&
                    moment(savedJobs.job.expiryDate).isAfter(moment())
                      ? moment(savedJobs.job.expiryDate).diff(
                          moment(),
                          "days"
                        ) <= 3
                        ? "yellow.500"
                        : "gray.500"
                      : "red.500"
                  }
                  fontSize={{ base: "12px", sm: "14px" }}
                >
                  {savedJobs?.job?.expiryDate &&
                  moment(savedJobs.job.expiryDate).isAfter(moment())
                    ? moment(savedJobs.job.expiryDate).diff(
                        moment(),
                        "days"
                      ) === 0
                      ? "Last day"
                      : `${moment(savedJobs.job.expiryDate).diff(
                          moment(),
                          "days"
                        )} day/s remaining`
                    : "Expired"}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </HStack>

        <HStack>
          <Button
            variant={"outline"}
            aria-label={"bookmark"}
            size={"sm"}
            p={1}
            onClick={() => handleBookmark(savedJobs.jobId)}
          >
            <Icon
              as={BookmarkSimple}
              weight={savedJobs.jobId ? "fill" : "regular"}
              boxSize={6}
            />
          </Button>
          {savedJobs.job?.expiryDate &&
          new Date(savedJobs.job.expiryDate) <= new Date() ? (
            <Button
              isDisabled
              variant={"solid"}
              colorScheme={"red"}
              size={"sm"}
            >
              Expired
            </Button>
          ) : (
            <Button
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight={500}
              colorScheme="gray"
              textColor={"primary.500"}
              _hover={{ bg: "primary.500", color: "white" }}
              transition={"all 0.1s"}
              size={"sm"}
              onClick={handleApplyOpen}
            >
              Apply Now
            </Button>
          )}
        </HStack>
      </HStack>
      <ApplyModal
        isOpen={isOpen}
        onClose={onClose}
        jobId={savedJobs.jobId}
        companyId={savedJobs.job?.company.id!}
      />
    </Stack>
  );
};

export default Card;
