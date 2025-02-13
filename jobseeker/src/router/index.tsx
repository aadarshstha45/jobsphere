import LayoutWrapper from "@/layouts";
import { Login, Register } from "@/pages/Auth";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { ROUTES } from "./routes";

type RouterProps = {
  isAuthenticated: boolean | null | undefined;
};

export function getAppRoutes({ isAuthenticated }: RouterProps) {
  return [
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to={"/"} /> : <Login />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to={"/"} /> : <Register />,
    },
    {
      path: "/",
      element: <LayoutWrapper />,
      children: [
        {
          index: true,
          element: <ROUTES.Home />,
        },
        {
          path: "find-job",
          element: <ROUTES.Job />,
        },
        {
          path: "find-job/:id",
          element: <ROUTES.SingleJob />,
        },
        {
          path: "find-employers",
          element: <ROUTES.Employer />,
        },
        {
          path: "find-employers/:id",
          element: <ROUTES.EmployerDetails />,
        },
        {
          path: "about-us",
          element: <ROUTES.AboutUs />,
        },
        {
          path: "profile",
          element: isAuthenticated ? (
            <ROUTES.Profile />
          ) : (
            <NavigateToLogin to={"/login"} />
          ),
          children: [
            {
              index: true,
              element: <ROUTES.Dashboard />,
            },
            {
              path: "applied-jobs",
              element: <ROUTES.AppliedJobs />,
            },
            {
              path: "saved-jobs",
              element: <ROUTES.SavedJobs />,
            },
            {
              path: "meetings",
              element: <ROUTES.Meetings />,
            },
            {
              path: "settings",
              element: <ROUTES.Settings />,
            },
            {
              path: "*",
              element: <ROUTES.Error404 />,
            },
          ],
        },
        {
          path: "*",
          element: <ROUTES.Error404 />,
        },
      ],
    },
  ];
}

const NavigateToLogin = ({ to }: { to: string }) => {
  const pathname = useLocation().pathname;
  useEffect(() => {
    toast.error("You need to be logged in to access this page.");
  }, []);
  return <Navigate to={`${to}?redirect=${pathname}`} />;
};
