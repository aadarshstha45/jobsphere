import { Flex, Spinner } from "@chakra-ui/react";

interface LoaderProps {
  color?: string;
  emptyColor?: string;
}

function Loader({ color, emptyColor }: LoaderProps) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      height={window.innerHeight / 2}
      width={"full"}
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
