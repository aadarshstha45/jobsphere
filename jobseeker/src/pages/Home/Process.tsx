import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  CircleWavyCheck,
  CloudArrowUp,
  MagnifyingGlassPlus,
  UserPlus,
} from "@phosphor-icons/react";
import { useState } from "react";

const ProcessData = [
  {
    id: 1,
    title: "Create account",
    description: "Create an account and complete your profile.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Search for job",
    description: "Search for a job that suits your interest.",
    icon: CloudArrowUp,
  },
  {
    id: 3,
    title: "Apply for job",
    description: "Apply for a job that matches your skills.",
    icon: MagnifyingGlassPlus,
  },
  {
    id: 4,
    title: "Get hired",
    description: "Get hired and start your career journey.",
    icon: CircleWavyCheck,
  },
];

const Process = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleHover = (id: number) => {
    setHovered(id === hovered ? null : id);
  };
  return (
    <Box bg={"gray.50"} py={5}>
      <Container
        maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
        py={5}
      >
        <Text textAlign={"center"} textStyle={"heading"}>
          How JobSphere Works
        </Text>
        <Flex
          gap={{ base: 8, md: 4 }}
          justify={"center"}
          py={10}
          flexWrap={"wrap"}
        >
          {ProcessData?.map(({ id, title, description, icon }) => (
            <Card
              flexBasis={{ base: "90%", sm: "40%", md: "35%", lg: "22%" }}
              key={id}
              shadow={"none"}
              role="group"
              borderRadius={"12px"}
              transition={"all 0.3s"}
              bg={id === hovered ? "white" : "transparent"}
              onMouseEnter={() => handleHover(id)}
              onMouseLeave={() => handleHover(id)}
            >
              <CardBody
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                transition={"all 0.3s"}
              >
                <Flex
                  justifySelf={"center"}
                  w={"fit-content"}
                  justify={"center"}
                  bg={"white"}
                  _groupHover={{ bg: "primary.500" }}
                  borderRadius={"50%"}
                  p={4}
                  mb={4}
                >
                  <Icon
                    as={icon}
                    boxSize={8}
                    weight="duotone"
                    _groupHover={{ color: "white" }}
                    color={"primary.500"}
                  />
                </Flex>
                <Text
                  fontSize={{
                    base: "14px",
                    md: "18px",
                  }}
                  fontWeight={500}
                  textAlign={"center"}
                >
                  {title}
                </Text>
                <Text
                  textAlign={"center"}
                  color={"gray.500"}
                  fontSize={{ base: "12px", md: "14px" }}
                >
                  {description}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Process;
