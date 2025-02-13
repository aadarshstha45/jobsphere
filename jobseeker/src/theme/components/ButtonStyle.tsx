import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  borderRadius: 5,
  fontWeight: 500,
  _active: {
    transform: "scale(0.98)",
  },
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
});

const outline = defineStyle({
  borderRadius: 5,
  fontWeight: 500,
  border: "1px solid",
  borderColor: "gray.300",

  _active: {
    transform: "scale(0.98)",
  },
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  shadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
});

const primary = defineStyle({
  bg: `primary.500`,
  fontWeight: 500,
  color: "white",
  borderRadius: 5,
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  _dark: {
    bg: `primary.300`,
  },
  _hover: {
    bg: `primary.600`,
    _dark: {
      bg: `primary.400`,
    },
    _loading: {
      bg: `primary.500`,
    },
    _disabled: {
      bg: `primary.500`,
    },
  },

  _active: {
    bg: `primary.500`,
    transform: "scale(0.98, 0.98)",
    _dark: {
      bg: `primary.400`,
    },
  },
});

const white = defineStyle({
  bg: "white",
  color: "primary.500",
  fontWeight: 500,
  borderRadius: 5,
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  _dark: {
    bg: "gray.800",
    color: "white",
  },
  _hover: {
    bg: "gray.50",
    _dark: {
      bg: "gray.700",
    },
    _loading: {
      bg: "white",
    },
    _disabled: {
      bg: "white",
    },
  },
  _active: {
    bg: "gray.100",
    transform: "scale(0.98, 0.98)",
    _dark: {
      bg: "gray.700",
    },
  },
});

export const ButtonStyle = defineStyleConfig({
  defaultProps: {
    variant: "solid",
  },
  variants: {
    solid,
    outline,
    primary,
    white,
  },
});
