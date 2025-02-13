import { Flex, Spinner } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useAuthentication, useLogoutUser } from "./api/auth";
import { getAppRoutes } from "./router";
import Loader from "./utils/Loader";
import ScrollToTop from "./utils/ScrollToTop";
const renderRoutes = (routes: any) => {
  return routes.map((route: any, index: number) => (
    <Route
      key={index}
      path={route.path}
      element={route.element}
      index={route.index}
    >
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const App = () => {
  const { data: isAuthenticated, isLoading: isAuthLoading } =
    useAuthentication();

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token") ? useLogoutUser() : null;
    }
  }, [isAuthenticated]);

  if (isAuthLoading) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems="center"
        height={window.innerHeight}
      >
        <Loader />
      </Flex>
    );
  }

  const appRoutes = getAppRoutes({ isAuthenticated });

  return (
    <Suspense
      fallback={
        <Flex
          justifyContent={"center"}
          alignItems="center"
          height={window.innerHeight}
        >
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      }
    >
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* App Routes */}
          <Route path="/" element={<Navigate to={"/admin/"} />} />
          <Route path="/" element={<Outlet />}>
            {renderRoutes(appRoutes)}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
