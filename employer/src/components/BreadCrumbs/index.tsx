import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { CaretRight, House } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

interface BreadCrumbsProps {
  bg?: string;
}

const BreadCrumbs = ({ bg }: BreadCrumbsProps) => {
  const location = useLocation();
  let currentLink = "";
  const path = location.pathname
    .split("/")
    .filter(
      (crumb) => crumb !== "" && crumb !== "product" && !/^\d+$/.test(crumb)
    );
  console.log(path);
  const crumbs = path.map((crumb, index) => {
    currentLink += `/${crumb}`;
    const crumbWithSpaces = crumb.replace(/-/g, " ");
    if (crumb === "admin") {
      return (
        <BreadcrumbLink
          textTransform={"capitalize"}
          as={Link}
          to={"/"}
          key={crumb}
          fontSize={{ base: "14px", md: "16px", xl: "18px" }}
        >
          Home
        </BreadcrumbLink>
      );
    }
    return (
      <BreadcrumbLink
        textTransform={"capitalize"}
        as={Link}
        to={index === path.length - 1 ? "#" : currentLink}
        key={crumb}
        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
      >
        {crumbWithSpaces}
      </BreadcrumbLink>
    );
  });

  return (
    <Breadcrumb bg={bg} separator={<CaretRight size={16} />}>
      <BreadcrumbItem as={Link} to={"/"}>
        <Icon weight="light" as={House} boxSize={6} />
      </BreadcrumbItem>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index} isCurrentPage={index === crumbs.length - 1}>
          {crumb}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
