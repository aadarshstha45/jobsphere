import SidebarItems from "@/pages/Profile/SidebarItem";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Briefcase } from "@phosphor-icons/react";
import { navItems } from "./data";

interface MobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Mobile = ({ isOpen, onClose }: MobileProps) => {
  return (
    <Drawer size={"xs"} placement="left" onClose={onClose} isOpen={isOpen}>
      {/* Mobile navigation */}
      {isOpen && (
        <Box
          pos={"fixed"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"rgba(0,0,0,0.5)"}
          zIndex={999}
          onClick={onClose}
        />
      )}
      <DrawerContent>
        <DrawerHeader display={"flex"} borderBottomWidth="1px">
          <Icon
            as={Briefcase}
            boxSize={6}
            color={"primary.500"}
            fontWeight={"bold"}
          />
          <Text ml={2} fontSize={"lg"} fontWeight={"bold"}>
            JobSphere
          </Text>
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <Stack gap={4}>
            {navItems.map((item, index) => (
              <SidebarItems onClose={onClose} item={item} key={index} />
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Mobile;
