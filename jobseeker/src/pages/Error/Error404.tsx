import Error404Image from "@/assets/images/404.png";
import {
  Button,
  ButtonGroup,
  Container,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Container
      maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        justifyItems={"center"}
        alignItems={"center"}
        spacing={4}
        h={"700px"}
      >
        <GridItem colSpan={1}>
          <Stack gap={4}>
            <Text
              fontSize={{ base: "24px", md: "28px", xl: "32px" }}
              fontWeight={600}
            >
              Oops, Page not found!
            </Text>
            <Text fontSize={{ base: "16px", md: "18px", xl: "20px" }}>
              Something went wrong. It's look like the link is broken or the
              page is removed.
            </Text>
            <ButtonGroup size={"sm"}>
              <Button
                as={Link}
                to={"/"}
                variant={"primary"}
                rightIcon={<Icon as={ArrowRight} boxSize={6} />}
              >
                Dashboard
              </Button>
            </ButtonGroup>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Image src={Error404Image} alt="404 Error" />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default Error404;
