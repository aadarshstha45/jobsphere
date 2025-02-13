import {
  As,
  Flex,
  HStack,
  Icon,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Item {
  icon: As;
  to: string;
  title: string;
}

interface SidebarItemsProps {
  item: Item;
  subItems?: Item[];
  isOpen?: boolean;
  onToggle?: () => void;
  width?: string;
  onClose?: () => void;
}

const SidebarItems = ({
  item,
  subItems,
  isOpen,
  onToggle,
  width,
  onClose,
}: SidebarItemsProps) => {
  const { pathname } = useLocation();
  const { colorMode } = useColorMode();
  const attributes = {
    p: "8px 12px",
    borderRadius: "6px",
    _hover: {
      bg: colorMode === "light" ? "primary.200" : "primary.700",
    },
    _activeLink: {
      bg: colorMode === "light" ? "primary.200" : "primary.700",
    },
    align: "center",
    justify: { base: "flex-start", sm: "center", md: "flex-start" },
    gap: 2,
    onClick: onClose,
  };

  useEffect(() => {
    if (pathname.includes(item.to)) {
      onToggle && onToggle();
    }
  }, [pathname]);

  return subItems && subItems.length > 0 ? (
    <>
      <Tooltip
        display={width === "75px" ? "block" : "none"}
        fontSize={"16px"}
        label={item.title}
        placement={"right"}
        hasArrow
      >
        <Flex
          bg={
            colorMode === "light"
              ? pathname.includes(item.to)
                ? "primary.200"
                : "transparent"
              : pathname.includes(item.to)
              ? "primary.700"
              : "transparent"
          }
          cursor={"pointer"}
          {...attributes}
          onClick={onToggle}
          justify={{ base: "start", sm: "center", md: "space-between" }}
          transition={"all 0.3s"}
          pos={"relative"}
        >
          <HStack justify={{ base: "center", md: "flex-start" }}>
            <Icon as={item.icon} boxSize={6} />
            <Text
              opacity={{ base: 1, sm: 0, md: 1 }}
              pos={{ base: "static", sm: "absolute", md: "static" }}
              fontSize={{ md: "16px" }}
            >
              {item.title}
            </Text>
          </HStack>
          <Icon
            opacity={{ base: 1, sm: 0, md: 1 }}
            as={CaretRight}
            pos={{ base: "static", sm: "absolute", md: "static" }}
            transition={"transform 0.3s"}
            transform={`rotate(${isOpen ? 90 : 0}deg)`}
            boxSize={5}
          />
        </Flex>
      </Tooltip>

      <Flex
        as={motion.div}
        initial={{ height: "0px", overflow: "hidden" }}
        animate={{
          height: isOpen ? "auto" : "0px",
          transition: { duration: 0.3 },
        }}
        exit={{
          height: "0px",
          overflow: "hidden",
          transition: { duration: 0.3 },
        }}
        pos={isOpen ? "static" : "absolute"}
        flexDir={"column"}
        opacity={isOpen ? 1 : 0}
        gap={2}
        pl={4}
        mt={isOpen ? 0 : -2}
      >
        {subItems.map((subItem, index) => (
          <Tooltip
            display={width === "75px" ? "block" : "none"}
            fontSize={"16px"}
            label={subItem.title}
            placement={"right"}
            hasArrow
            key={index}
          >
            <Flex as={NavLink} to={subItem.to} key={index} {...attributes}>
              <Icon as={subItem.icon} boxSize={6} />
              <Text
                opacity={{ base: 1, sm: 0, md: 1 }}
                pos={{ base: "static", sm: "absolute", md: "static" }}
                fontSize={{ md: "16px" }}
              >
                {subItem.title}
              </Text>
            </Flex>
          </Tooltip>
        ))}
      </Flex>
    </>
  ) : (
    <Tooltip
      display={width === "75px" ? "block" : "none"}
      fontSize={"16px"}
      label={item.title}
      placement={"right"}
      hasArrow
    >
      <Flex as={NavLink} to={item.to} {...attributes}>
        <Icon as={item.icon} boxSize={6} />
        <Text
          opacity={{ base: 1, sm: 0, md: 1 }}
          pos={{ base: "static", sm: "absolute", md: "static" }}
          fontSize={{ md: "16px" }}
        >
          {item.title}
        </Text>
      </Flex>
    </Tooltip>
  );
};

export default SidebarItems;
