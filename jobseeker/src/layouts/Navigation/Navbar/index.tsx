import { RootInterface } from "@/api/auth/response";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import BottomNav from "./BottomNav";
import { navItems } from "./data";
import Mobile from "./Mobile";

type NavbarProps = {
  isAuthenticated: boolean;
  user?: RootInterface | undefined;
};

const Navbar = ({ isAuthenticated, user }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack gap={0}>
      <Box bg={"gray.100"}>
        <Container
          maxW={{
            base: "100vw",
            sm: "95vw",
            md: "90vw",
            lg: "80vw",
            xl: "75vw",
          }}
          px={0}
        >
          <Flex
            display={{ base: "flex", md: "none" }}
            justify={"space-between"}
            align={"center"}
            p={4}
          >
            <Mobile isOpen={isOpen} onClose={onClose} />
            <Button p={1} variant={"outline"} onClick={onOpen}>
              <Icon as={List} boxSize={6} />
            </Button>
            <Button p={1} variant={"outline"}>
              <Icon as={MagnifyingGlass} boxSize={6} />
            </Button>
          </Flex>
          <Flex
            display={{ base: "none", md: "flex" }}
            align={"center"}
            p={2}
            pb={0}
          >
            <HStack gap={4}>
              {navItems.map((item, index) => (
                <Link
                  as={NavLink}
                  _activeLink={{
                    color: "primary.500",
                    borderBottom: "2px",
                  }}
                  _hover={{
                    color: "primary.500",
                    borderBottom: "2px",
                    textDecoration: "none",
                  }}
                  onClick={() => history.replaceState(null, "", "")}
                  borderBottom={"2px"}
                  borderBottomColor={"transparent"}
                  pb={2}
                  fontSize={{ base: "14px", md: "18px" }}
                  to={item.to}
                  key={index}
                >
                  {item.title}
                </Link>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <BottomNav user={user} isAuthenticated={isAuthenticated} />
    </Stack>
  );
};

export default Navbar;
