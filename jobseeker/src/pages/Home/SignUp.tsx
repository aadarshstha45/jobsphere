import TokenService from "@/services/service-token";
import {
  Button,
  Card,
  Container,
  GridItem,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  console.log({ isAuthenticated });

  return (
    !isAuthenticated && (
      <Container
        maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
        py={10}
      >
        <SimpleGrid
          justifyItems={"center"}
          columns={{ base: 1, md: 2 }}
          gap={4}
        >
          <GridItem w={"full"} colSpan={1}>
            <Card
              p={{ base: "30px", sm: "50px" }}
              borderRadius={"12px"}
              bg={"gray.100"}
            >
              <Stack gap={4}>
                <Text
                  fontWeight={500}
                  fontSize={{ base: "lg", sm: "2xl", xl: "3xl" }}
                >
                  Become a Candidate
                </Text>
                <Text color={"gray.600"}>
                  Sign up to get the latest job updates
                </Text>

                <Button
                  rightIcon={<Icon as={ArrowRight} boxSize={5} />}
                  variant={"white"}
                  borderRadius={3}
                  w={"fit-content"}
                  as={Link}
                  to={"/register"}
                >
                  Register Now
                </Button>
              </Stack>
            </Card>
          </GridItem>
          <GridItem w={"full"} colSpan={1}>
            <Card
              color={"white"}
              p={{ base: "30px", sm: "50px" }}
              borderRadius={"12px"}
              bg={"primary.500"}
              w={"full"}
            >
              <Stack gap={4}>
                <Text
                  fontWeight={500}
                  fontSize={{ base: "lg", sm: "2xl", xl: "3xl" }}
                >
                  Become an Employer
                </Text>
                <Text>Sign up to get the latest job updates</Text>

                <Button
                  rightIcon={<Icon as={ArrowRight} boxSize={5} />}
                  variant={"white"}
                  borderRadius={3}
                  w={"fit-content"}
                  as={Link}
                  to={"http://localhost:5000/register"}
                >
                  Register Now
                </Button>
              </Stack>
            </Card>
          </GridItem>
        </SimpleGrid>
      </Container>
    )
  );
};

export default SignUp;
