import { useFetchUser } from "@/api/auth";
import TokenService from "@/services/service-token";
import { Button, Container, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import MobileView from "./MobileView";
import Sidebar from "./Sidebar";

const Profile = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { data } = useFetchUser({ enabled: isAuthenticated });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container maxW={{ base: "100vw", sm: "95vw" }} px={0}>
      <Flex minH={window.innerHeight}>
        <Sidebar />
        <Container
          maxW={"100vw"}
          pl={{ sm: "30px", md: "100px" }}
          overflowX={"hidden"}
          py={4}
        >
          <Flex flexDir={"column"} gap={4}>
            <Button
              onClick={onOpen}
              variant={"outline"}
              display={{ base: "flex", sm: "none" }}
              w={"fit-content"}
            >
              <Icon as={List} boxSize={5} />
            </Button>
            <Outlet context={data} />
          </Flex>
        </Container>
        <MobileView isOpen={isOpen} onClose={onClose} header={"Profile"} />
      </Flex>
    </Container>
  );
};

export default Profile;
