/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChakraSelectStyles } from "@/hooks";
import { HStack, Icon, ResponsiveValue, useColorMode } from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import { Control, Controller } from "react-hook-form";
import { FormControl } from "../config";

interface OptionProps {
  value: string;
  label: string;
}

type SelectProps = {
  options: OptionProps[];
  placeholder?: string;
  name: string;
  control?: Control<any>;
  handleChange?: any;
  label?: string;
  value?: { value: string | number; label: string } | null;
  width?: ResponsiveValue<string | number>;
  isRequired?: boolean;
  isFloating?: boolean;
  noOptionsMessage?: () => string;
  isControlled?: boolean;
  helperText?: string;
  isReadOnly?: boolean;
  backendError?: Record<string, string[]>;
};

const SelectInput = ({
  options,
  name,
  control,
  handleChange,
  label,
  width,
  isRequired,
  value,
  noOptionsMessage,
  helperText,
  isReadOnly,
  backendError,
  isFloating = true,
  isControlled = true,
}: SelectProps) => {
  const chakraStyles = useChakraSelectStyles();
  const { colorMode } = useColorMode();
  const customSingleValue = (props: any) => (
    <chakraComponents.SingleValue {...props}>
      <HStack fontSize={{ base: "14px", md: "16px" }} gap={1} align={"center"}>
        {props.data.icon && (
          <Icon
            weight={"fill"}
            as={props.data.icon}
            boxSize={5}
            color={"primary.500"}
          />
        )}
        <span>{props.data.label}</span>
      </HStack>
    </chakraComponents.SingleValue>
  );

  const customOption = (props: any) => (
    <chakraComponents.Option {...props}>
      <HStack gap={2} align={"center"}>
        {props.data.icon && <Icon as={props.data.icon} boxSize={5} />}

        <span>{props.data.label}</span>
      </HStack>
    </chakraComponents.Option>
  );

  const components = {
    SingleValue: customSingleValue,
    Option: customOption,
  };

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl
            label={label}
            helperText={helperText}
            error={error}
            width={width}
            isRequired={!!isRequired}
            isReadOnly={!!isReadOnly}
            backendError={backendError}
            name={name}
            value={value}
            isFloating={isFloating}
          >
            <Select
              onChange={(option) => {
                handleChange && handleChange(option);
                onChange((option as { value: string })?.value);
                backendError = undefined;
              }}
              chakraStyles={chakraStyles}
              value={options ? options.find((c) => c.value === value) : ""}
              selectedOptionStyle="check"
              focusBorderColor={
                colorMode === "light" ? "primary.500" : "primary.300"
              }
              errorBorderColor={
                colorMode === "light" ? "error.500" : "error.300"
              }
              placeholder={""}
              components={components}
              options={options}
              noOptionsMessage={noOptionsMessage}
              useBasicStyles
            />
          </FormControl>
        );
      }}
    />
  ) : (
    <FormControl
      label={label}
      width={width}
      helperText={helperText}
      name={name}
      value={value}
      isFloating={isFloating}
    >
      <Select
        chakraStyles={chakraStyles}
        value={value}
        // defaultValue={options[0]}
        onChange={handleChange}
        selectedOptionStyle="check"
        focusBorderColor={colorMode === "light" ? "primary.500" : "primary.300"}
        errorBorderColor={colorMode === "light" ? "error.500" : "error.300"}
        placeholder={""}
        options={options}
        menuPortalTarget={document.body}
        components={components}
        useBasicStyles
      />
    </FormControl>
  );
};

export default SelectInput;
