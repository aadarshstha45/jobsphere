import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { ColorStyles as colors } from "./ColorStyles";
import { ButtonStyle as Button, FormStyle as Form } from "./components";
import { TextStyle as textStyles } from "./components/TextStyle";

// Supports weights 100-900
import "@fontsource-variable/inter";
import { reactDatepickerStyles } from "./components/ReactDatePickerStyle";

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      scrollbarGutter: "stable",
      "&::-webkit-scrollbar": {
        width: "0.2rem",
        height: "0.6rem",
        position: "absolute",
      },
      "&::-webkit-scrollbar-track": {
        position: "absolute",
        background: "#fff",
        opacity: 0.1,
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#111111",
        borderRadius: 20,
      },
      "html, body": {
        fontFamily: "Inter Variable",
      },
      ...reactDatepickerStyles(props),
    }),
  },
  colors,
  textStyles,
  components: {
    Form,
    Button,
  },
});
