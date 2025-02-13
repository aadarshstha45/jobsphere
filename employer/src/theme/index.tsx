import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { ColorStyles as colors } from "./ColorStyles";
import { ButtonStyle as Button, FormStyle as Form } from "./components";

// Supports weights 100-900
import "@fontsource-variable/inter";
import { reactDatepickerStyles } from "./components/ReactDatePickerStyle";

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        fontFamily: "Inter Variable",
      },
      ...reactDatepickerStyles(props),
    }),
  },
  colors,
  components: {
    Form,
    Button,
  },
});
