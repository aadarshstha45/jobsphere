import {
  Container,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer5 from "./Footer5";

const Footer = () => {
  const [isLessThan350] = useMediaQuery("(max-width: 350px)");

  return (
    <Flex
      flexDir={"column"}
      as={"footer"}
      mt={5}
      bg={"gray.900"}
      color={"white"}
    >
      <Container
        maxW={{
          base: "98vw",
          sm: "95vw",
          md: "90vw",
          lg: "80vw",
          xl: "85vw",
        }}
      >
        <Flex py={24}>
          <SimpleGrid
            columns={isLessThan350 ? 1 : { base: 2, md: 2, lg: 3, xl: 5 }}
            spacing={10}
          >
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <Footer1 />
            </GridItem>
            <GridItem colSpan={isLessThan350 ? 2 : 1}>
              <Footer2 />
            </GridItem>
            <GridItem colSpan={isLessThan350 ? 2 : 1}>
              <Footer3 />
            </GridItem>
            <GridItem colSpan={isLessThan350 ? 2 : 1}>
              <Footer4 />
            </GridItem>
            <GridItem colSpan={isLessThan350 ? 2 : 1}>
              <Footer5 />
            </GridItem>
          </SimpleGrid>
        </Flex>
        <Divider borderColor={"gray.500"} my={4} />
        <Flex justify={"space-between"} flexWrap={"wrap"} gap={5} p={5}>
          <Text fontSize={{ base: "12px", md: "14px" }} color={"gray.500"}>
            @ 2024 Job Sphere. All rights Reserved
          </Text>
          <HStack>
            <Link to={"https://www.facebook.com/"} target={"_blank"}>
              <Icon
                color={"gray.600"}
                _hover={{ color: "white" }}
                as={FacebookLogo}
                boxSize={5}
              />
            </Link>
            <Link to={"https://www.youtube.com/"} target={"_blank"}>
              <Icon
                color={"gray.600"}
                _hover={{ color: "white" }}
                as={YoutubeLogo}
                boxSize={5}
              />
            </Link>

            <Link to={"https://www.instagram.com/"} target={"_blank"}>
              <Icon
                color={"gray.600"}
                _hover={{ color: "white" }}
                as={InstagramLogo}
                boxSize={5}
              />
            </Link>

            <Link to={"https://www.twitter.com/"} target={"_blank"}>
              <Icon
                color={"gray.600"}
                _hover={{ color: "white" }}
                as={TwitterLogo}
                boxSize={5}
              />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Footer;
