import { useFetchCategoriesForHome } from "@/api/function";
import { Container, Flex, Stack, Text } from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

const Category = () => {
  const { data } = useFetchCategoriesForHome();

  return (
    <Flex flexDir={"column"} py={10} gap={4}>
      <Container
        maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
      >
        <Text mb={4} textStyle={"heading"}>
          Job Categories
        </Text>

        {data?.data.rows && data?.data?.rows?.length > 0 && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              0: 1,
              360: 2,
              768: 3,
              1280: 4,
            }}
          >
            <Masonry gutter="20px">
              {data?.data.rows.map((item, index) => (
                <Stack
                  _hover={{
                    bg: "white",
                    boxShadow: "0px 12px 48px 0px rgba(0, 44, 109, 0.10)",
                  }}
                  p={4}
                  as={Link}
                  to={`/find-job?categoryId=${item.id}`}
                  borderRadius={5}
                  key={index}
                >
                  <Text
                    fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                    fontWeight={500}
                  >
                    {item.name}
                  </Text>
                  <Text fontSize="14px" color="gray.500">
                    {item.jobCount} Job Openings
                  </Text>
                </Stack>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </Container>
    </Flex>
  );
};

export default Category;
