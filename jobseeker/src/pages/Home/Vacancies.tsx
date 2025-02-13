import { useFetchJobsForHome } from "@/api/function";
import { Container, Flex, Stack, Text } from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

const Vacancies = () => {
  const { data } = useFetchJobsForHome();

  return (
    <Container
      maxW={{ base: "100vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
      py={10}
    >
      {data?.data && data.data.count > 0 && (
        <Flex flexDir={"column"} gap={6}>
          <Text as="h2" textStyle={"heading"}>
            Vacancies
          </Text>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 0: 1, 450: 2, 750: 3, 1200: 4 }}
          >
            <Masonry gutter="10px">
              {data.data.rows.map((job) => (
                <Stack
                  role="group"
                  as={Link}
                  to={`/find-job/${job.id}`}
                  key={job.id}
                  p={4}
                >
                  <Text
                    fontWeight={500}
                    _groupHover={{
                      color: "primary.500",
                      textDecor: "underline",
                    }}
                    fontSize={{ base: "16px", md: "18px" }}
                    noOfLines={1}
                  >
                    {job.title}
                  </Text>
                  <Text
                    color={"gray.500"}
                    fontSize={{ base: "12px", md: "14px" }}
                    noOfLines={1}
                  >
                    {job.vacancies} Open Positions
                  </Text>
                </Stack>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </Flex>
      )}
    </Container>
  );
};

export default Vacancies;
