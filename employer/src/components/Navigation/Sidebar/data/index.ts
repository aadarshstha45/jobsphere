import {
  BookmarkSimple,
  Briefcase,
  EnvelopeSimple,
  GearSix,
  House,
} from "@phosphor-icons/react";

export const sidebarData = [
  {
    id: 1,
    title: "Overview",
    icon: House,
    to: "",
  },
  {
    id: 2,
    title: "Jobs",
    icon: Briefcase,
    to: "jobs",
  },

  {
    id: 3,
    title: "Applications",
    icon: EnvelopeSimple,
    to: "all-applications",
  },
  {
    id: 4,
    title: "Shortlisted",
    icon: BookmarkSimple,
    to: "shortlisted",
  },
  {
    id: 5,
    title: "Meetings",
    icon: Briefcase,
    to: "meetings",
  },
  {
    id: 6,
    title: "Settings",
    icon: GearSix,
    to: "profile",
  },
];
