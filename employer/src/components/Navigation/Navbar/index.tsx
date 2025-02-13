import { checkAuthentication } from "@/api/auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Bell, List } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import Mobile from "./Mobile";

const Navbar = () => {
  const pathname = useLocation()
    .pathname.split("/")
    .filter((path) => path !== "" && !/^\d+$/.test(path))
    .at(-1);
  console.log(pathname);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = checkAuthentication();
  return (
    <Box
      pos={"fixed"}
      borderLeft={"none"}
      borderBottom={"1px solid "}
      borderColor={"gray.100"}
      shadow={"xs"}
      zIndex={100}
      bg={"gray.50"}
      w={{
        base: "100%",
        sm: `calc(100vw - 70px)`,
        md: `calc(100vw - 250px)`,
      }}
    >
      <Container maxW={{ base: "98vw", sm: "85vw" }}>
        <Flex justify={"space-between"} align={"center"} py={4}>
          <HStack>
            <Mobile isOpen={isOpen} onClose={onClose} />
            <Icon
              display={{ base: "flex", sm: "none" }}
              as={List}
              weight="bold"
              boxSize={6}
              cursor={"pointer"}
              onClick={onOpen}
            />
            <Text
              fontWeight={600}
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
            >
              {pathname ? pathname.toUpperCase() : "DASHBOARD"}
            </Text>
          </HStack>
          {!isAuthenticated ? (
            <HStack gap={4} align={"center"}>
              <Icon as={Bell} boxSize={6} />
              <Button size={"sm"} colorScheme="primary">
                Log In
              </Button>
              <Avatar size={"sm"} />
            </HStack>
          ) : (
            <Avatar
              src="https://bit.ly/dan-abramov"
              size={{ base: "sm", md: "md" }}
            />
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
