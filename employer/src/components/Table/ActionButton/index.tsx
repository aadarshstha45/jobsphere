/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { ReactElement } from "react";

interface TableActionButtonProps {
  icon: ReactElement;
  children: any;
}

export const FilterPopover = ({ icon, children }: TableActionButtonProps) => {
  return (
    <Menu closeOnBlur={true} closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label="Filter"
        icon={icon}
        bg={"white"}
        size={"md"}
        _hover={{ bg: "gray.50" }}
        border={" solid"}
        borderRadius={"md"}
        borderWidth={1}
        shadow={"sm"}
        borderColor={"gray.200"}
      />
      <MenuList py={0} minW={"fit-content"}>
        {children}
      </MenuList>
    </Menu>
  );
};
