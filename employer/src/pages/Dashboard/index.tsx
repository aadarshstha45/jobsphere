import { RootInterface } from "@/api/functions/company/response";
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
  Briefcase,
  Envelope,
  IdentificationCard,
} from "@phosphor-icons/react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import JobTable from "./JobTable";

const Dashboard = () => {
  const data: RootInterface = useOutletContext();

  const navigate = useNavigate();
  return (
    <Flex flexDir={"column"} gap={4}>
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Hello, {data?.data.name}
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
        <GridItem colSpan={1}>
          <Flex
            bg={"primary.50"}
            justify={"space-between"}
            align={"center"}
            p={4}
            borderRadius={4}
            _hover={{ bg: "primary.100" }}
            cursor={"pointer"}
            onClick={() => navigate("jobs")}
          >
            <Stack gap={2}>
              <Text
                fontSize={{ base: "18px", md: "20px", xl: "22px" }}
                fontWeight={600}
              >
                {data?.data?.jobCount ?? 0}
              </Text>
              <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
                Open Jobs
              </Text>
            </Stack>
            <Flex
              bg={"white"}
              w={12}
              h={12}
              borderRadius={4}
              justify={"center"}
              align={"center"}
            >
              <Icon as={Briefcase} w={6} h={6} color={"primary.500"} />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Flex
            bg={"gray.50"}
            _hover={{ bg: "gray.100" }}
            justify={"space-between"}
            align={"center"}
            p={4}
            borderRadius={4}
          >
            <Stack gap={2}>
              <Text
                fontSize={{ base: "18px", md: "20px", xl: "22px" }}
                fontWeight={600}
              >
                0
              </Text>
              <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
                Applications
              </Text>
            </Stack>
            <Flex
              bg={"white"}
              w={12}
              h={12}
              borderRadius={8}
              justify={"center"}
              align={"center"}
            >
              <Icon as={Envelope} w={6} h={6} color={"primary.500"} />
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
                Saved Candidates
              </Text>
            </Stack>
            <Flex
              bg={"white"}
              w={12}
              h={12}
              borderRadius={4}
              justify={"center"}
              align={"center"}
            >
              <Icon as={IdentificationCard} w={6} h={6} color={"primary.500"} />
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
          Recently Posted Jobs
        </Text>
        <Button
          variant={"outline"}
          as={Link}
          to={"jobs"}
          size={"sm"}
          px={{ base: 2, sm: 4 }}
          rightIcon={<Icon as={ArrowRight} boxSize={{ base: 4, sm: 6 }} />}
        >
          View All
        </Button>
      </HStack>
      <JobTable />
    </Flex>
  );
};

export default Dashboard;
