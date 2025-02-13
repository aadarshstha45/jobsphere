import { Flex, Spinner } from "@chakra-ui/react";

interface LoaderProps {
  color?: string;
  emptyColor?: string;
  height?: string;
  width?: string;
}

function Loader({ color, emptyColor, height, width }: LoaderProps) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      height={height ?? "500px"}
      width={width}
    >
      <Spinner
        thickness="5px"
        speed="0.7s"
        emptyColor={emptyColor ?? "gray.200"}
        color={color ?? "primary.500"}
        size="xl"
      />
    </Flex>
  );
}

export default Loader;
