import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
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
  const crumbs = path.map((crumb, index) => {
    currentLink += `/${crumb}`;
    const crumbWithSpaces = crumb.replace(/-/g, " ");

    return (
      <BreadcrumbLink
        textTransform={"capitalize"}
        as={Link}
        to={index === path.length ? "#" : currentLink}
        key={crumb}
        fontSize={{ base: "14px", md: "16px" }}
      >
        {crumbWithSpaces}
      </BreadcrumbLink>
    );
  });

  return (
    <Breadcrumb bg={bg} separator={"/"}>
      <BreadcrumbItem>
        <BreadcrumbLink
          textTransform={"capitalize"}
          as={Link}
          to={"/"}
          fontSize={{ base: "14px", md: "16px" }}
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index} isCurrentPage={index === crumbs.length}>
          {crumb}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
