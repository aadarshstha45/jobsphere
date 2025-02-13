import SlickSlider from "@/components/SlickSlider";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Star } from "@phosphor-icons/react";
import { testimonials } from "./data";

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 720,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const Testimonials = () => {
  return (
    <Box bg={"gray.50"} py={10}>
      <Container
        maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
      >
        <Flex flexDir={"column"} gap={4}>
          <Text textAlign={"center"} textStyle={"heading"}>
            Client Testimonials
          </Text>
          <SlickSlider responsive={responsive} slidesToShow={3}>
            {testimonials.map((testimonial) => (
              <Card
                h={"max-content"}
                noOfLines={5}
                my={2}
                key={testimonial.id}
                p={4}
                shadow={"md"}
                borderRadius={8}
              >
                <CardHeader p={0}>
                  <HStack gap={1}>
                    {...[
                      Array.from({ length: testimonial.ratings }).map(
                        (_, index) => (
                          <Icon
                            boxSize={5}
                            key={index}
                            as={Star}
                            weight="fill"
                            color={"#FFAA00"}
                          />
                        )
                      ),
                    ]}
                  </HStack>
                </CardHeader>
                <CardBody py={4} p={0}>
                  <Text>{testimonial.comment}</Text>
                </CardBody>
                <CardFooter p={0}>
                  <HStack justify={"space-between"}>
                    <HStack align={"start"} gap={2}>
                      <Avatar boxSize={"40px"} src={testimonial.image} />
                      <Stack gap={0}>
                        <Text fontSize={"16px"} fontWeight={500}>
                          {testimonial.name}
                        </Text>
                        <Text fontSize={"14px"} color={"gray.500"}>
                          {testimonial.designation}
                        </Text>
                      </Stack>
                    </HStack>
                  </HStack>
                </CardFooter>
              </Card>
            ))}
          </SlickSlider>
        </Flex>
      </Container>
    </Box>
  );
};

export default Testimonials;
