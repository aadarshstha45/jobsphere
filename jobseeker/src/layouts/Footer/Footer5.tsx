import { Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const support = [
  {
    title: "Faqs",
    to: "/faqs",
  },
  {
    title: "Privacy Policy",
    to: "/node_modules",
  },
  {
    title: "Terms & Conditions",
    to: "/terms-conditions",
  },
];

const Footer5 = () => {
  return (
    <Stack gap={2}>
      <Text fontWeight={500} fontSize={{ base: "16px", md: "18px" }}>
        Support
      </Text>
      <Stack spacing={2} w={"max-content"}>
        {support.map((item, index) => (
          <Text
            key={index}
            as={Link}
            to={item.to}
            color={"gray.600"}
            _hover={{ color: "white" }}
            fontSize={{ base: "14px", md: "16px" }}
          >
            {item.title}
          </Text>
          //   </HStack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer5;
