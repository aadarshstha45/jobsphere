import { BaseURL } from "@/api/axiosSetup";
import { useFetchCompaniesForHome } from "@/api/function";
import NoLogo from "@/assets/images/NoLogo.png";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MapPin } from "@phosphor-icons/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

const Companies = () => {
  const { data } = useFetchCompaniesForHome();

  return (
    <Flex flexDir={"column"} py={10} gap={4}>
      <Container
        maxW={{ base: "98vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
      >
        <Text textStyle={"heading"} mb={4}>
          Companies
        </Text>

        {data?.data.rows && data?.data?.rows?.length > 0 && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              0: 1,
              600: 2,
              950: 3,
              1400: 4,
            }}
          >
            <Masonry gutter="20px">
              {data?.data.rows.map((item, index) => (
                <Card
                  key={index}
                  border={"1px solid var(--chakra-colors-gray-50)"}
                  _hover={{
                    boxShadow: "0px 12px 48px 0px rgba(0, 44, 109, 0.10)",
                    border: "1px solid var(--chakra-colors-primary-100)",
                  }}
                  boxShadow={"none"}
                >
                  <CardBody pb={0}>
                    <HStack align={"start"}>
                      <Image
                        src={item.logo ? `${BaseURL}/${item.logo}` : NoLogo}
                        alt={item.name}
                        boxSize={12}
                      />
                      <Stack>
                        <Text
                          noOfLines={1}
                          fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                          fontWeight={500}
                        >
                          {item.name}
                        </Text>
                        <HStack>
                          <Icon as={MapPin} color="gray.500" />
                          <Text noOfLines={1} fontSize="14px" color="gray.500">
                            {item.location}
                          </Text>
                        </HStack>
                      </Stack>
                    </HStack>
                  </CardBody>
                  <CardFooter>
                    <Button
                      as={Link}
                      to={`/find-job?companyId=${item.id}`}
                      variant={"outline"}
                      w={"full"}
                    >
                      Open Jobs ({item.jobCount})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </Container>
    </Flex>
  );
};

export default Companies;
