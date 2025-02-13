import { Briefcase, House, Mailbox, User } from "@phosphor-icons/react";

export const navItems = [
  {
    id: 1,
    title: "Dashboard",
    to: "",
    icon: House,
  },
  {
    id: 2,
    title: "Find Candidates",
    to: "find-candidates",
    icon: User,
  },
  {
    id: 3,
    title: "My Jobs",
    to: "my-jobs",
    icon: Briefcase,
  },
  {
    id: 4,
    title: "Applications",
    to: "applications",
    icon: Mailbox,
  },
];
