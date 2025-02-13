import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@chakra-ui/react";
import { sidebarData } from "./data";
import SidebarItem from "./SidebarItem";

interface MobileViewProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
}

const MobileView = ({ isOpen, onClose, header }: MobileViewProps) => {
  return (
    <Drawer isOpen={isOpen} placement={"left"} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader borderBottomWidth={"1px"}>{header}</DrawerHeader>
        <DrawerBody py={4} display={"flex"} flexDir={"column"} gap={4}>
          {sidebarData.map((item, index) => (
            <SidebarItem onClose={onClose} item={item} key={index} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileView;
