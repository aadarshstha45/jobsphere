import { HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Briefcase } from "@phosphor-icons/react";

const Footer1 = () => {
  return (
    <Stack gap={2}>
      <HStack mb={2}>
        <Icon as={Briefcase} boxSize={8} />
        <Text fontSize={{ base: "20px", md: "22px" }} fontWeight={500}>
          JobSphere
        </Text>
      </HStack>
      <HStack w={"max-content"}>
        <Text color={"gray.600"}>Call Now:</Text>
        <Text>+1 234 567 890</Text>
      </HStack>
      <Text fontSize={"14px"} color={"gray.600"}>
        6391 Elgin St. Celina, Delaware 10299, New York, United States of
        America
      </Text>
    </Stack>
  );
};

export default Footer1;
