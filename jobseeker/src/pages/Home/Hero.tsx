import {
  Box,
  Container,
  Flex,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useFetchDataCount } from "@/api/function";
import HomeBanner from "@/assets/images/HomeBanner.png";
import {
  Briefcase,
  BuildingOffice,
  Envelope,
  Users,
} from "@phosphor-icons/react";

const Hero = () => {
  const { data } = useFetchDataCount();

  return (
    <Box w={"full"} bg={"gray.50"} py={{ base: 4, sm: 10 }}>
      <Container
        maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
      >
        <Flex flexDir={"column"} gap={4}>
          <SimpleGrid
            alignItems={"center"}
            columns={{ base: 1, sm: 2 }}
            spacingX={10}
            spacingY={4}
          >
            <GridItem colSpan={1}>
              <Stack
                maxW={{
                  base: "98vw",
                  sm: "95vw",
                  md: "90vw",
                  lg: "80vw",
                  xl: "75vw",
                }}
              >
                <Text
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontWeight={"bold"}
                  color={"gray.800"}
                  lineHeight={1.2}
                >
                  Find a job that suits your interest & skills.
                </Text>
                <Text>
                  Find your next career opportunity. Explore jobs that match
                  your skills and start your journey today!
                </Text>
              </Stack>
            </GridItem>
            <GridItem flexShrink={0} alignContent={"center"} colSpan={1}>
              <Image
                flexShrink={0}
                h={{ base: 300, sm: "auto" }}
                src={HomeBanner}
                alt={"Home Banner"}
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid
            justifyItems={"center"}
            columns={{ base: 2, lg: 4 }}
            spacing={4}
            mt={6}
          >
            <GridItem w={"full"} colSpan={1}>
              <Flex borderRadius={5} gap={4} bg={"white"} p={4} align={"start"}>
                <Flex
                  align={"center"}
                  bg={"primary.100"}
                  p={2}
                  borderRadius={5}
                >
                  <Icon
                    borderRadius={5}
                    as={Briefcase}
                    color={"primary.500"}
                    boxSize={{ base: 4, md: 6, lg: 8 }}
                  />
                </Flex>
                <Stack gap={0}>
                  <Text
                    fontSize={{
                      base: "16px",
                      sm: "18px",
                      md: "20px",
                      lg: "22px",
                    }}
                    fontWeight={500}
                  >
                    {data?.data?.jobCount}
                  </Text>
                  <Text
                    fontSize={{
                      base: "12px",
                      sm: "14px",
                      md: "16px",
                      lg: "18px",
                    }}
                    color={"gray.500"}
                  >
                    Live Jobs
                  </Text>
                </Stack>
              </Flex>
            </GridItem>
            <GridItem w={"full"} colSpan={1}>
              <Flex borderRadius={5} gap={4} bg={"white"} p={4} align={"start"}>
                <Flex
                  align={"center"}
                  bg={"primary.100"}
                  p={2}
                  borderRadius={5}
                >
                  <Icon
                    borderRadius={5}
                    as={BuildingOffice}
                    color={"primary.500"}
                    boxSize={{ base: 4, md: 6, lg: 8 }}
                  />
                </Flex>
                <Stack gap={0}>
                  <Text
                    fontSize={{
                      base: "16px",
                      sm: "18px",
                      md: "20px",
                      lg: "22px",
                    }}
                    fontWeight={500}
                  >
                    {data?.data?.employerCount}
                  </Text>
                  <Text
                    fontSize={{
                      base: "12px",
                      sm: "14px",
                      md: "16px",
                      lg: "18px",
                    }}
                    color={"gray.500"}
                  >
                    Companies
                  </Text>
                </Stack>
              </Flex>
            </GridItem>
            <GridItem w={"full"} colSpan={1}>
              <Flex borderRadius={5} gap={4} bg={"white"} p={4} align={"start"}>
                <Flex
                  align={"center"}
                  bg={"primary.100"}
                  p={2}
                  borderRadius={5}
                >
                  <Icon
                    borderRadius={5}
                    as={Users}
                    color={"primary.500"}
                    boxSize={{ base: 4, md: 6, lg: 8 }}
                  />
                </Flex>
                <Stack gap={0}>
                  <Text
                    fontSize={{
                      base: "16px",
                      sm: "18px",
                      md: "20px",
                      lg: "22px",
                    }}
                    fontWeight={500}
                  >
                    {data?.data?.jobseekerCount}
                  </Text>
                  <Text
                    fontSize={{
                      base: "12px",
                      sm: "14px",
                      md: "16px",
                      lg: "18px",
                    }}
                    color={"gray.500"}
                  >
                    Candidates
                  </Text>
                </Stack>
              </Flex>
            </GridItem>
            <GridItem w={"full"} colSpan={1}>
              <Flex borderRadius={5} gap={4} bg={"white"} p={4} align={"start"}>
                <Flex
                  align={"center"}
                  bg={"primary.100"}
                  p={2}
                  borderRadius={5}
                >
                  <Icon
                    borderRadius={5}
                    as={Envelope}
                    color={"primary.500"}
                    boxSize={{ base: 4, md: 6, lg: 8 }}
                  />
                </Flex>
                <Stack gap={0}>
                  <Text
                    fontSize={{
                      base: "16px",
                      sm: "18px",
                      md: "20px",
                      lg: "22px",
                    }}
                    fontWeight={500}
                  >
                    {data?.data?.applicationCount}
                  </Text>
                  <Text
                    fontSize={{
                      base: "12px",
                      sm: "14px",
                      md: "16px",
                      lg: "18px",
                    }}
                    color={"gray.500"}
                  >
                    Applications
                  </Text>
                </Stack>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
