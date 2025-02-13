import { RootInterface } from "@/api/auth/response";
import { useFetchStats } from "@/api/function/jobseeker";
import Loader from "@/utils/Loader";
import {
  Button,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowRight,
  BellRinging,
  BookmarkSimple,
  Briefcase,
  List,
} from "@phosphor-icons/react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Applications from "./Applications";

const Dashboard = () => {
  const data: RootInterface = useOutletContext();

  const { data: stats } = useFetchStats();

  console.log({ stats });

  const navigate = useNavigate();
  if (!data) return <Loader />;
  return (
    <Flex flexDir={"column"} gap={4}>
      <Button
        p={2}
        display={{ base: "block", sm: "none" }}
        variant={"outline"}
        w={"fit-content"}
      >
        <Icon as={List} boxSize={6} />
      </Button>

      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Hello, {data?.data.name.split(" ")[0]}
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
        <GridItem colSpan={1}>
          <Flex
            bg={"primary.50"}
            justify={"space-between"}
            align={"center"}
            p={4}
            borderRadius={8}
            _hover={{ bg: "primary.100" }}
            cursor={"pointer"}
            onClick={() => navigate("applied-jobs")}
          >
            <Stack gap={2}>
              <Text
                fontSize={{ base: "18px", md: "20px", xl: "22px" }}
                fontWeight={600}
              >
                {stats?.data.applications ?? 0}
              </Text>
              <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
                Applied Jobs
              </Text>
            </Stack>
            <Flex
              bg={"white"}
              boxSize={12}
              borderRadius={8}
              justify={"center"}
              align={"center"}
            >
              <Icon
                as={Briefcase}
                boxSize={8}
                weight="fill"
                color={"primary.50"}
                stroke={"primary.500"}
                strokeWidth={10}
              />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Flex
            bg={"orange.50"}
            _hover={{ bg: "orange.100" }}
            justify={"space-between"}
            align={"center"}
            p={4}
            cursor={"pointer"}
            onClick={() => navigate("saved-jobs")}
            borderRadius={8}
          >
            <Stack gap={2}>
              <Text
                fontSize={{ base: "18px", md: "20px", xl: "22px" }}
                fontWeight={600}
              >
                {stats?.data.savedJobs ?? 0}
              </Text>
              <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
                Saved Jobs
              </Text>
            </Stack>
            <Flex
              bg={"white"}
              boxSize={12}
              borderRadius={8}
              justify={"center"}
              align={"center"}
            >
              <Icon
                as={BookmarkSimple}
                weight={"fill"}
                boxSize={8}
                stroke={"orange.500"}
                strokeWidth={10}
                color={"orange.50"}
              />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Flex
            bg={"#FFF6E6"}
            _hover={{ bg: "#FFEDCC" }}
            justify={"space-between"}
            align={"center"}
            p={4}
            borderRadius={8}
          >
            <Stack gap={2}>
              <Text
                fontSize={{ base: "18px", md: "20px", xl: "22px" }}
                fontWeight={600}
              >
                0
              </Text>
              <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
                Job Alerts
              </Text>
            </Stack>
            <Flex
              bg={"white"}
              boxSize={12}
              borderRadius={8}
              justify={"center"}
              align={"center"}
            >
              <Icon
                as={BellRinging}
                weight="fill"
                boxSize={8}
                stroke={"success.500"}
                strokeWidth={10}
                color={"success.50"}
              />
            </Flex>
          </Flex>
        </GridItem>
      </SimpleGrid>

      <HStack
        justify={"space-between"}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
        mt={4}
      >
        <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
          Recently Applied Jobs
        </Text>
        <Button
          variant={"outline"}
          as={Link}
          to={"applied-jobs"}
          size={"sm"}
          px={{ base: 2, sm: 4 }}
          rightIcon={<Icon as={ArrowRight} boxSize={{ base: 4, sm: 6 }} />}
        >
          View All
        </Button>
      </HStack>

      <Applications />
    </Flex>
  );
};

export default Dashboard;
