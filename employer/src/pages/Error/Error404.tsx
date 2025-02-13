import Error404Image from "@/assets/images/404.png";
import {
  Button,
  ButtonGroup,
  Flex,
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
    <Flex justify={"center"}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        justifyItems={"center"}
        alignItems={"center"}
        spacing={4}
        maxW={{ base: "90vw", md: "80vw", xl: "70vw" }}
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
                to={"/admin/"}
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
    </Flex>
  );
};

export default Error404;
