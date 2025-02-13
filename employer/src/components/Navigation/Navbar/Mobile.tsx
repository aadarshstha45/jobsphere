import { useLogoutUser } from "@/api/auth";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Briefcase, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { sidebarData } from "../Sidebar/data";
import SidebarItem from "../Sidebar/SidebarItem";

interface MobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Mobile = ({ isOpen, onClose }: MobileProps) => {
  const logout = useLogoutUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout.mutateAsync();
    if (response.status === 200) {
      navigate("/login", { replace: true });
    }
    window.location.reload();
  };
  return (
    <Drawer
      colorScheme="gray"
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent
        bg={"gray.50"}
        minH={window.innerHeight}
        maxH={window.innerHeight}
      >
        <DrawerCloseButton />
        <DrawerHeader
          borderBottom={"1px solid"}
          borderColor={"gray.100"}
          shadow={"xs"}
        >
          <HStack>
            <Icon as={Briefcase} boxSize={8} />
            <Text>JobSphere</Text>
          </HStack>
        </DrawerHeader>
        <DrawerBody display={"flex"} flexDir={"column"} gap={4} py={4}>
          {sidebarData.map((item) => (
            <SidebarItem onClose={onClose} key={item.id} item={item} />
          ))}
        </DrawerBody>
        <DrawerFooter
          shadow={"xs"}
          borderTop={"1px solid"}
          borderColor={"gray.100"}
        >
          <Flex
            _hover={{
              bg: "red.200",
              borderRadius: "md",
            }}
            bg="red.100"
            color="black"
            borderRadius="md"
            w={"full"}
            cursor={"pointer"}
            onClick={handleLogout}
          >
            <Flex p={2} align={"center"} gap={4} borderRadius={"md"}>
              <Icon as={SignOut} boxSize={5} />
              <Text fontSize={"md"}>Logout</Text>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Mobile;
