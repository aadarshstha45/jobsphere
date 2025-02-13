import {
  BookmarkSimple,
  Briefcase,
  Gear,
  House,
  Presentation,
} from "@phosphor-icons/react";

export const sidebarData = [
  {
    id: 1,
    title: "Overview",
    to: "/profile",
    icon: House,
  },
  {
    id: 2,
    title: "Applied Jobs",
    to: "/profile/applied-jobs",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Saved Jobs",
    to: "/profile/saved-jobs",
    icon: BookmarkSimple,
  },
  {
    id: 4,
    title: "Meetings",
    to: "/profile/meetings",
    icon: Presentation,
  },
  {
    id: 5,
    title: "Settings",
    to: "/profile/settings",
    icon: Gear,
  },
];
