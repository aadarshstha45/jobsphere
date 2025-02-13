import { Box, Container, Flex, Text } from "@chakra-ui/react";
import BreadCrumbs from ".";

const BreadCrumb = ({ heading }: { heading: string }) => {
  return (
    <Box bg={"gray.100"}>
      <Container
        py={4}
        maxW={{
          base: "98vw",
          sm: "95vw",
          md: "90vw",
          lg: "80vw",
          xl: "75vw",
        }}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Text fontSize={"18px"} fontWeight={500}>
            {heading}
          </Text>
          <BreadCrumbs />
        </Flex>
      </Container>
    </Box>
  );
};

export default BreadCrumb;
