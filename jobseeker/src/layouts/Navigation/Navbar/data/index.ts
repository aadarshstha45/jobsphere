import { BookmarkSimple, Briefcase, User } from "@phosphor-icons/react";

export const navItems = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Find Job",
    to: "/find-job",
  },
  {
    id: 3,
    title: "Find Employers",
    to: "/find-employers",
  },
  {
    id: 4,
    title: "Dashboard",
    to: "/profile",
  },
];

export const profileMenuItems = [
  {
    label: "My Account",
    to: "/profile",
    icon: User,
  },
  {
    label: "Applied Jobs",
    to: "profile/applied-jobs",
    icon: Briefcase,
  },
  {
    label: "Saved Jobs",
    to: "profile/saved-jobs",
    icon: BookmarkSimple,
  },
];
