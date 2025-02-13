import { useLogoutUser } from "@/api/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { BookOpen, SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import SidebarItems from "./SidebarItem";
import { sidebarData } from "./data";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { mutateAsync: logoutUser } = useLogoutUser();
  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const { colorMode } = useColorMode();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.status === 200) {
      window.location.href = "/";
    }
  };

  return (
    <Card
      h={"100dvh"}
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      w={{ base: 0, sm: "75px", md: "250px" }}
      opacity={{ base: 0, sm: 1 }}
      pointerEvents={{ base: "none", sm: "auto" }}
      transition={"all 0.3s ease-in-out"}
      pos={"fixed"}
      border={"none"}
      borderRadius={0}
      shadow={"none"}
      borderRight={"1px solid var(--chakra-colors-gray-200)"}
    >
      <CardHeader
        p={5}
        borderBottom={"1px solid var(--chakra-colors-gray-200)"}
      >
        <Icon as={BookOpen} boxSize={8} />
      </CardHeader>
      <CardBody
        overflowY={"auto"}
        overflowX={"hidden"}
        display={"flex"}
        flexDir={"column"}
        gap={2}
        px={2}
      >
        {sidebarData.map((item, index) => (
          <SidebarItems
            key={index}
            item={item}
            onToggle={() => handleToggle(index)}
            isOpen={openIndex === index}
          />
        ))}
      </CardBody>
      <CardFooter p={5} borderTop={"1px solid var(--chakra-colors-gray-300)"}>
        <Button
          w={"full"}
          colorScheme="error"
          variant={"outline"}
          onClick={handleLogout}
          rightIcon={<Icon as={SignOut} />}
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Sidebar;
