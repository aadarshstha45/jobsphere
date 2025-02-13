import { Flex, Spinner } from "@chakra-ui/react";
import { ReactNode, Suspense, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useAuthentication, useLogoutUser } from "./api/auth";
import "./App.css";
import { getAuthRoutes } from "./router";
import Loader from "./utils/Loader";

interface RouteProps {
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: RouteProps[];
}

const renderRoutes = (routes: RouteProps[]) => {
  return routes.map((route: RouteProps, index: number) =>
    route.index ? (
      <Route key={index} index={route.index} element={route.element} />
    ) : (
      <Route key={index} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  );
};

const App = () => {
  const { data: isAuthenticated, isLoading: isAuthLoading } =
    useAuthentication();
  const { mutateAsync: logoutUser } = useLogoutUser();
  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token") ? logoutUser() : null;
    }
  }, [isAuthenticated, logoutUser]);
  if (isAuthLoading) {
    return (
      <Flex justifyContent={"center"} alignItems="center">
        <Loader />
      </Flex>
    );
  }
  const authRoutes = getAuthRoutes(isAuthenticated!);

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
        <Routes>
          <Route path="/" element={<Outlet />}>
            {renderRoutes(authRoutes)}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
