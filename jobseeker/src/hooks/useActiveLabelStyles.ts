import { useColorMode } from "@chakra-ui/react";

export const useActiveLabelStyles = () => {
  const { colorMode } = useColorMode();
  return {
    transform: "scale(0.9) translateY(-25px)",
    transition: "transform 0.2s ease-in-out",
    backgroundColor: colorMode === "dark" ? "gray.900" : "white",
    zIndex: 1,
    px: 2,
  };
};
