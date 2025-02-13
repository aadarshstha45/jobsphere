import { BaseURL } from "@/api/axiosSetup";
import { useFetchApplicationDetail } from "@/api/functions/application";
import { formatSalary } from "@/libs/functions/formatSalary";
import { educationOptions, experienceOptions } from "@/libs/options";
import Loader from "@/utils/Loader";
import {
  Avatar,
  Button,
  Link as ChakraLink,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import {
  Cake,
  DownloadSimple,
  Envelope,
  FileText,
  GlobeSimple,
  GraduationCap,
  MapPin,
  PhoneCall,
  Stack as StackIcon,
  UserCircle,
} from "@phosphor-icons/react";
import dompurify from "dompurify";

interface ViewApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const ViewApplication = ({ isOpen, onClose, id }: ViewApplicationProps) => {
  const { data, isPending } = useFetchApplicationDetail(id);
  const [isLessThan850] = useMediaQuery("(max-width: 850px)");
  const [isLessThan1060] = useMediaQuery("(max-width: 1060px)");
  const [isLessThan450] = useMediaQuery("(max-width: 450px)");
  return (
    <>
      <Global
        styles={`
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
  `}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInTop"
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent
          maxW={{
            base: "98vw",
            sm: "95vw",
            md: "90vw",
            lg: "85vw",
            xl: "80vw",
          }}
          pos={"fixed"}
          h={"max-content"}
          maxH={window.innerHeight - 100}
          overflowY={"auto"}
          overflowX={"hidden"}
        >
          <ModalCloseButton
            p={2}
            variant={"outline"}
            color={"primary.500"}
            borderRadius={"full"}
          />
          {isPending ? (
            <ModalBody>
              <Loader />
            </ModalBody>
          ) : (
            <ModalBody py={10} px={{ base: 4, sm: 6 }}>
              {data && data.data && (
                <Flex flexDir={"column"} gap={4}>
                  <Flex justify={"space-between"}>
                    <HStack>
                      <Avatar
                        src={`${BaseURL}/${data.data.jobseeker.profilePicture}`}
                        boxSize={20}
                        borderRadius={"full"}
                      />
                      <Stack>
                        <Text fontSize={"lg"}>
                          {data.data.jobseeker?.user?.name}
                        </Text>
                      </Stack>
                    </HStack>
                  </Flex>
                  <SimpleGrid columns={isLessThan1060 ? 1 : 3} spacing={10}>
                    <GridItem colSpan={2}>
                      <Stack>
                        {data?.data?.jobseeker.biography && (
                          <>
                            <Text fontWeight={700} fontSize={"lg"}>
                              Biography
                            </Text>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: dompurify.sanitize(
                                  data?.data?.jobseeker.biography
                                ),
                              }}
                            ></div>
                          </>
                        )}
                        <Divider my={4} borderColor={"gray.300"} />
                        {data?.data?.coverLetter && (
                          <>
                            <Text fontWeight={700} fontSize={"lg"}>
                              Cover Letter
                            </Text>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: dompurify.sanitize(
                                  data?.data?.coverLetter
                                ),
                              }}
                            ></div>
                          </>
                        )}
                        <Divider opacity={isLessThan850 ? 1 : 0} my={4} />
                      </Stack>
                    </GridItem>
                    <GridItem colSpan={isLessThan1060 ? 2 : 1}>
                      <Flex
                        flexDir={"column"}
                        gap={4}
                        w={
                          isLessThan450
                            ? "full"
                            : isLessThan1060
                            ? "400px"
                            : "full"
                        }
                        align={"center"}
                      >
                        <Flex
                          flexDir={"column"}
                          gap={4}
                          border={"1px solid rgba(206, 224, 245, 0.70)"}
                          p={4}
                          w={{ base: "full", sm: "full", lg: "full" }}
                          borderRadius={8}
                        >
                          <SimpleGrid
                            columns={{ base: 1, sm: 2 }}
                            spacingX={{ sm: 10, lg: 2 }}
                            spacingY={{ base: 4, md: 10 }}
                          >
                            <GridItem colSpan={1}>
                              <Icon
                                as={StackIcon}
                                boxSize={6}
                                color={"primary.500"}
                              />
                              <Text fontSize={{ base: "12px", sm: "14px" }}>
                                Experience
                              </Text>
                              <Text
                                fontWeight={500}
                                fontSize={{ base: "14px", sm: "16px" }}
                              >
                                {
                                  experienceOptions.find(
                                    (option) =>
                                      option.value ===
                                      data?.data?.jobseeker.experience
                                  )?.label
                                }
                              </Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Icon
                                as={GraduationCap}
                                boxSize={6}
                                color={"primary.500"}
                              />

                              <Text fontSize={{ base: "12px", sm: "14px" }}>
                                Education
                              </Text>
                              <Text
                                fontWeight={500}
                                fontSize={{ base: "14px", sm: "16px" }}
                              >
                                {
                                  educationOptions.find(
                                    (option) =>
                                      option.value ===
                                      data?.data?.jobseeker.education
                                  )?.label
                                }
                              </Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Icon
                                as={UserCircle}
                                boxSize={6}
                                color={"primary.500"}
                              />

                              <Text fontSize={{ base: "12px", sm: "14px" }}>
                                Gender
                              </Text>
                              <Text
                                textTransform={"capitalize"}
                                fontWeight={500}
                                fontSize={{ base: "14px", sm: "16px" }}
                              >
                                {data?.data.jobseeker.gender}
                              </Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                              <Icon
                                as={Cake}
                                boxSize={6}
                                color={"primary.500"}
                              />

                              <Text fontSize={{ base: "12px", sm: "14px" }}>
                                Salary
                              </Text>
                              <Text
                                textTransform={"capitalize"}
                                fontWeight={500}
                                fontSize={{ base: "14px", sm: "16px" }}
                              >
                                {data?.data?.job.salaryType === "paid"
                                  ? `${formatSalary(
                                      data?.data?.job.minSalary
                                    )} - ${formatSalary(
                                      data?.data?.job.maxSalary
                                    )}`
                                  : data?.data?.job.salaryType}
                              </Text>
                            </GridItem>
                          </SimpleGrid>
                        </Flex>
                        <Flex
                          flexDir={"column"}
                          gap={4}
                          border={"1px solid rgba(206, 224, 245, 0.70)"}
                          p={4}
                          w={"full"}
                          borderRadius={8}
                        >
                          <Text
                            fontWeight={500}
                            fontSize={{ base: "16px", sm: "18px" }}
                          >
                            Download Resume
                          </Text>
                          <HStack
                            justify={"space-between"}
                            gap={4}
                            flexWrap={"wrap"}
                          >
                            <HStack gap={2} align={"start"}>
                              <Icon
                                as={FileText}
                                color={"primary.500"}
                                boxSize={12}
                                weight="thin"
                              />
                              <Text fontSize={"14px"}>
                                {data.data.resume.title}
                              </Text>
                            </HStack>
                            <Button
                              borderColor={"gray.200"}
                              bg={"primary.50"}
                              p={"12px"}
                              _hover={{ bg: "primary.100" }}
                              as={ChakraLink}
                              target="_blank"
                              href={`${BaseURL}/${data.data.resume.resume}`}
                              size={"md"}
                            >
                              <Icon
                                as={DownloadSimple}
                                boxSize={6}
                                color={"primary.500"}
                              />
                            </Button>
                          </HStack>
                        </Flex>
                        <Flex
                          flexDir={"column"}
                          gap={2}
                          border={"1px solid rgba(206, 224, 245, 0.70)"}
                          shadow={"sm"}
                          p={4}
                          w={"full"}
                          borderRadius={8}
                          overflow={"hidden"}
                        >
                          <Text
                            fontWeight={500}
                            fontSize={{ base: "16px", sm: "18px" }}
                          >
                            Contact Information
                          </Text>
                          {data.data.jobseeker.website && (
                            <>
                              <HStack
                                flexDir={{ base: "column", sm: "row" }}
                                align={"start"}
                                gap={4}
                                flexWrap={"wrap"}
                              >
                                <Icon
                                  as={GlobeSimple}
                                  color={"primary.500"}
                                  boxSize={8}
                                  weight="duotone"
                                />
                                <Stack gap={0}>
                                  <Text
                                    fontSize={{ base: "12px", md: "14px" }}
                                    color={"gray.500"}
                                  >
                                    Website
                                  </Text>
                                  <ChakraLink
                                    href={`${data.data.jobseeker.website}`}
                                    target="_blank"
                                    fontSize={{ base: "12px", md: "16px" }}
                                  >
                                    {data.data.jobseeker.website}
                                  </ChakraLink>
                                </Stack>
                              </HStack>
                              <Divider my={2} borderColor="gray.300" />
                            </>
                          )}
                          {data.data.jobseeker.location && (
                            <>
                              <HStack
                                flexDir={{ base: "column", sm: "row" }}
                                align={"start"}
                                gap={4}
                                flexWrap={"wrap"}
                              >
                                <Icon
                                  as={MapPin}
                                  color={"primary.500"}
                                  boxSize={8}
                                  weight="duotone"
                                />
                                <Stack gap={0}>
                                  <Text
                                    fontSize={{ base: "12px", sm: "14px" }}
                                    color={"gray.500"}
                                  >
                                    Location
                                  </Text>
                                  <Text fontSize={{ base: "12px", sm: "16px" }}>
                                    {data.data.jobseeker.location}
                                  </Text>
                                </Stack>
                              </HStack>

                              <Divider my={2} borderColor="gray.300" />
                            </>
                          )}
                          {data.data.jobseeker.phone && (
                            <>
                              <HStack
                                align={"start"}
                                gap={4}
                                flexDir={{ base: "column", sm: "row" }}
                                flexWrap={"wrap"}
                              >
                                <Icon
                                  as={PhoneCall}
                                  color={"primary.500"}
                                  boxSize={8}
                                  weight="duotone"
                                />
                                <Stack gap={0}>
                                  <Text
                                    fontSize={{ base: "12px", sm: "14px" }}
                                    color={"gray.500"}
                                  >
                                    Phone
                                  </Text>
                                  <ChakraLink
                                    href={`tel:${data.data.jobseeker.phone}`}
                                    fontSize={{ base: "12px", sm: "16px" }}
                                  >
                                    {data.data.jobseeker.phone}
                                  </ChakraLink>
                                </Stack>
                              </HStack>
                              <Divider my={2} borderColor="gray.300" />
                            </>
                          )}
                          <HStack
                            flexDir={{ base: "column", sm: "row" }}
                            align={"start"}
                            gap={4}
                            flexWrap={"wrap"}
                          >
                            <Icon
                              as={Envelope}
                              color={"primary.500"}
                              boxSize={8}
                              weight="duotone"
                            />
                            <Stack gap={0}>
                              <Text
                                fontSize={{ base: "12px", sm: "14px" }}
                                color={"gray.500"}
                              >
                                Email
                              </Text>
                              <ChakraLink
                                href={`mailto:${data.data.jobseeker.user?.email}`}
                                fontSize={{ base: "12px", sm: "16px" }}
                              >
                                {data.data.jobseeker.user?.email}
                              </ChakraLink>
                            </Stack>
                          </HStack>
                        </Flex>
                      </Flex>
                    </GridItem>
                  </SimpleGrid>
                </Flex>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewApplication;
