import { Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const employer = [
  {
    title: "Post a Job",
    to: "http://localhost:5000/jobs/create",
  },
  {
    title: "Browse Candidates",
    to: "http://localhost:5000/candidates",
  },
  {
    title: "Employer Dashboard",
    to: "http://localhost:5000/profile",
  },
];

const Footer4 = () => {
  return (
    <Stack gap={2}>
      <Text fontWeight={500} fontSize={{ base: "16px", md: "18px" }}>
        Employers
      </Text>
      <Stack spacing={2} w={"max-content"}>
        {employer.map((item, index) => (
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

export default Footer4;
