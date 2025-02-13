import { useFetchUser } from "@/api/auth";
import TokenService from "@/services/service-token";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navigation/Navbar";

const LayoutWrapper = () => {
  const isAuthenticated = TokenService.isAuthenticated();
  const { data: user } = useFetchUser({ enabled: isAuthenticated });
  return (
    <Flex flexDir={"column"} overflow={"hidden"} minH={window.innerHeight}>
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <Outlet context={user} />
      <Footer />
    </Flex>
  );
};

export default LayoutWrapper;
