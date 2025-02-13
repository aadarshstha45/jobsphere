/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/api/axiosSetup";
import Fancybox from "@/components/Fancybox";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface ImageColumnProps {
  image: string | null;
  alt?: string;
  w?: any;
  h?: any;
}

const ImageColumn = ({ image, alt, w, h }: ImageColumnProps) => {
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: true,
        },
        dragToClose: true,
      }}
    >
      <Box
        w={w ?? 70}
        h={h ?? 70}
        borderRadius="5px"
        border={"1px solid #E2E8F0"}
        overflow="hidden"
      >
        {image ? (
          <Box as="a" href={`${BaseURL}/${image}`} data-fancybox>
            <Image
              objectFit={"cover"}
              w="100%"
              h="100%"
              objectPosition={"center"}
              loading="lazy"
              src={`${BaseURL}/${image}`}
              alt={alt}
              fallback={<Box bg={"secondary.300"} />}
            />
          </Box>
        ) : (
          <Flex
            justify={"center"}
            align={"center"}
            bg={"secondary.100"}
            w={"full"}
            h={"full"}
          >
            <Text>No Image</Text>
          </Flex>
        )}
      </Box>
    </Fancybox>
  );
};

export default ImageColumn;
