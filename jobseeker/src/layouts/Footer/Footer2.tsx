import { Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Services",
    to: "/services",
  },
  {
    title: "Contact",
    to: "/contact",
  },
  {
    title: "Blog",
    to: "/blog",
  },
];

const Footer2 = () => {
  return (
    <Stack gap={2}>
      <Text fontWeight={500} fontSize={{ base: "16px", md: "18px" }}>
        Quick Links
      </Text>
      <Stack spacing={2} w={"max-content"}>
        {quickLinks.map((link, index) => (
          //   <HStack
          //     pos={"relative"}
          //     _hover={{ color: "white" }}
          //     as={Link}
          //     to={link.to}
          //     role="group"
          //     cursor={"pointer"}
          //   >
          //     <Icon
          //       opacity={0}
          //       pos={"absolute"}
          //       _groupHover={{ opacity: 1, position: "static" }}
          //       as={ArrowRight}
          //       boxSize={5}
          //     />
          <Text
            key={index}
            as={Link}
            to={link.to}
            color={"gray.600"}
            _hover={{ color: "white" }}
            fontSize={{ base: "14px", md: "16px" }}
          >
            {link.title}
          </Text>
          //   </HStack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer2;
