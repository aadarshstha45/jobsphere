import { lazy } from "react";

const Error404 = lazy(() => import("@/pages/Error/Error404"));
const Home = lazy(() => import("@/pages/Home"));
const Job = lazy(() => import("@/pages/Job"));
const SingleJob = lazy(() => import("@/pages/Job/JobDetail"));
const Employer = lazy(() => import("@/pages/Employer"));
const EmployerDetails = lazy(() => import("@/pages/Employer/Details"));
const Profile = lazy(() => import("@/pages/Profile"));
const Dashboard = lazy(() => import("@/pages/Profile/Dashboard"));
const AppliedJobs = lazy(() => import("@/pages/Profile/AppliedJobs"));
const Settings = lazy(() => import("@/pages/Profile/Settings"));
const SavedJobs = lazy(() => import("@/pages/Profile/SavedJobs"));
const Meetings = lazy(() => import("@/pages/Profile/Meetings"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));

export const ROUTES = {
  AboutUs,
  AppliedJobs,
  Dashboard,
  Employer,
  EmployerDetails,
  Error404,
  Home,
  Job,
  Meetings,
  Profile,
  SavedJobs,
  Settings,
  SingleJob,
};
