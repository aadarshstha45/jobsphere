import { useActiveLabelStyles } from "@/hooks";
import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface FormControlProps {
  variant?: "default" | "floating";
  leftIcon?: React.ReactNode;
  label?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  helperText?: string;
  error?: FieldError;
  backendError?: string[];
  children: React.ReactNode;
  width?: ResponsiveValue<string | number>;
  name: string;
  value?: any;
  isFloating?: boolean;
  isDisabled?: boolean;
}

const FormControl = ({
  label,
  name,
  isFloating,
  isRequired,
  isDisabled,
  error,
  isReadOnly,
  helperText,
  backendError,
  children,
  leftIcon,
  value,
  width,
}: FormControlProps) => {
  const floatingLabel = useActiveLabelStyles();
  const floatingProps = isFloating
    ? {
        _focusWithin: {
          label: {
            ...floatingLabel,
          },
        },
        variant: "floating",
      }
    : {};
  return (
    <ChakraFormControl
      {...floatingProps}
      my={2}
      width={width ?? "100%"}
      isRequired={isRequired}
      isInvalid={!!error || !!backendError}
      isReadOnly={!!isReadOnly}
      isDisabled={isDisabled}
    >
      {!isFloating && label && (
        <FormLabel mb={2} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      {children}
      {isFloating && label && (
        <FormLabel
          left={leftIcon ? 4 : 0}
          fontSize={{ base: "14px", md: "16px" }}
          textColor={!!error || !!backendError ? "red.500" : "gray.500"}
          htmlFor={name}
          _groupFocus={{ textColor: "primary.500" }}
          sx={value ? floatingLabel : {}}
        >
          {label}
        </FormLabel>
      )}
      {helperText && (!error || !backendError) && (
        <FormHelperText fontStyle={"italic"} color="gray.500">
          *{helperText}
        </FormHelperText>
      )}
      {backendError && <FormErrorMessage>{backendError[0]}</FormErrorMessage>}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </ChakraFormControl>
  );
};

export default FormControl;
