import { Box, Card, CardBody } from "@chakra-ui/react";
import { sidebarData } from "./data";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <Box
      pos={"relative"}
      display={{ base: "none", sm: "flex" }}
      w={{ base: "70px", md: "250px" }}
    >
      <Card
        overflowY={"auto"}
        overflowX={"hidden"}
        pos={"absolute"}
        minH={window.innerHeight}
        w={{ base: "0px", sm: "70px", md: "250px" }}
        borderColor={"gray.100"}
        borderRadius={0}
        borderRight={"1px solid"}
        borderRightColor={"gray.100"}
        transition={"all 0.3s"}
        transitionProperty={"width"}
        borderTop={"none"}
        shadow={"none"}
        gap={2}
        py={2}
        display={{ base: "none", sm: "flex" }}
      >
        <CardBody p={2} display={"flex"} flexDir={"column"} gap={4}>
          {sidebarData.map((item, index) => (
            <SidebarItem item={item} key={index} />
          ))}
        </CardBody>
      </Card>
    </Box>
  );
};

export default Sidebar;
