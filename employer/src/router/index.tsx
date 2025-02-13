/* eslint-disable react-refresh/only-export-components */
import AdminLayout from "@/layouts";
import {
  AllApplications,
  ApplicationDetails,
  Applications,
  Dashboard,
  Error404,
  JobForm,
  Jobs,
  Meetings,
  Profile,
  ShortListed,
} from "@/pages";
import { Login, Register } from "@/pages/Auth";
import { Navigate } from "react-router-dom";

// Function to return auth routes
export function getAuthRoutes(isAuthenticated: boolean) {
  return [
    {
      path: "/login",
      element: !isAuthenticated ? <Login /> : <Navigate to={"/"} />,
    },
    {
      path: "/register",
      element: !isAuthenticated ? <Register /> : <Navigate to={"/"} />,
    },
    {
      path: "/",
      element: isAuthenticated ? (
        <AdminLayout />
      ) : (
        <Navigate
          to={
            window.location.pathname !== "/"
              ? `/login?redirect=${window.location.pathname}`
              : "/login"
          }
        />
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "jobs",
          element: <Jobs />,
        },
        {
          path: "jobs/create",
          element: <JobForm />,
        },
        {
          path: "jobs/edit/:id",
          element: <JobForm />,
        },
        {
          path: "jobs/:id/applications",
          element: <Applications />,
        },
        {
          path: "all-applications",
          element: <AllApplications />,
        },
        {
          path: "jobs/:jobId/applications/:id",
          element: <ApplicationDetails />,
        },
        {
          path: "meetings",
          element: <Meetings />,
        },
        {
          path: "shortlisted",
          element: <ShortListed />,
        },
        {
          path: "profile",
          element: <Profile />,
        },

        { path: "*", element: <Error404 /> },
      ],
    },
    { path: "*", element: <Error404 /> },
  ];
}
