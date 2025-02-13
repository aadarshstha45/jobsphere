import { Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const candidate = [
  {
    title: "Browse Jobs",
    to: "/find-job",
  },
  {
    title: "Browse Companies",
    to: "/find-employer",
  },
  {
    title: "Candidate Dashboard",
    to: "/profile",
  },
  {
    title: "Saved Jobs",
    to: "/profile/saved-jobs",
  },
];

const Footer3 = () => {
  return (
    <Stack gap={2}>
      <Text fontWeight={500} fontSize={{ base: "16px", md: "18px" }}>
        Candidate
      </Text>
      <Stack spacing={2} w={"max-content"}>
        {candidate.map((item, index) => (
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

export default Footer3;
