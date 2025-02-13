import { useColorMode } from "@chakra-ui/react";

// Define the type for the props that the function will receive
interface InputPropsOptions {
  variant?: string;
  placeholder?: string;
}

// Function that returns input props
export const getInputElementProps = ({
  variant,
  placeholder,
}: InputPropsOptions) => {
  const { colorMode } = useColorMode();

  return {
    variant: variant,
    borderRadius: 5,
    fontSize: { base: "14px", md: "16px" },
    lineHeight: "24px",
    size: "lg",
    bg: colorMode === "light" ? "white" : "gray.800",
    focusBorderColor: colorMode === "light" ? "primary.500" : "primary.300",
    errorBorderColor: colorMode === "light" ? "error.500" : "error.300",
    borderColor: colorMode === "light" ? "gray.300" : "gray.600",
    boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    placeholder: placeholder ?? "",
  };
};
