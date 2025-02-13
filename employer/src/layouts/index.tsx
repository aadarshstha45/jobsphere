import { useFetchUserCompany } from "@/api/functions/company";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Navbar, Sidebar } from "@/components/Navigation";
import Loader from "@/utils/Loader";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
  const { data } = useFetchUserCompany();
  const { pathname } = useLocation();

  return (
    <Box overflow={"hidden"} minH={window.innerHeight}>
      <Flex w={"full"}>
        {/* <Sidebar user={data || []} /> */}
        <Sidebar />
        <Flex
          pl={{ sm: "70px", md: "250px" }}
          flexDir={"column"}
          w={"full"}
          gap={2}
          overflow={"hidden"}
        >
          <Navbar />
          <Container
            mt={{ base: 16, md: 20 }}
            maxW={{ base: "99vw", md: "90vw", xl: "85vw" }}
            py={4}
          >
            <Suspense fallback={<Loader />}>
              <Stack gap={4}>
                {pathname !== "/" && <BreadCrumbs />}
                <Outlet context={data} />
              </Stack>
            </Suspense>
          </Container>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AdminLayout;
