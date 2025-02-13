import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const JobForm = lazy(() => import("@/pages/Jobs/JobForm"));
const Error404 = lazy(() => import("@/pages/Error/Error404"));
const Profile = lazy(() => import("@/pages/Profile"));
const Applications = lazy(() => import("@/pages/Applications"));
const ApplicationDetails = lazy(
  () => import("@/pages/Applications/ApplicationDetails")
);
const Meetings = lazy(() => import("@/pages/Meetings"));
const ShortListed = lazy(() => import("@/pages/ShortListed"));
const AllApplications = lazy(
  () => import("@/pages/Applications/AllApplications")
);
export {
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
};
