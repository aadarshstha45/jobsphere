/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ResponsiveValue,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

import { ReactNode, useState } from "react";
import { Control, Controller } from "react-hook-form";
import reactTextareaAutosize from "react-textarea-autosize";
import CkEditor from "../../Ckeditor";
import { FormControl, getInputElementProps } from "../config";

interface FormDataType {
  name: string;
  placeholder?: string;
  label?: string;
  variant?: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  control?: Control<any>;
  backendError?: Record<string, string[]>;
  isReadOnly?: boolean;
  leftIcon?: ReactNode;
  helperText?: string;
  rightIcon?: ReactNode;
  value?: any;
  isFloating?: boolean;
  onChange?: (e: any) => void;
  width?: ResponsiveValue<string | number>;
  isControlled?: boolean;
}

const TextInput = ({
  name,
  label,
  type,
  isRequired,
  isReadOnly,
  placeholder,
  control,
  variant,
  leftIcon,
  isFloating = true,
  rightIcon,
  width,
  backendError,
  helperText,
  isDisabled,
  value,
  onChange,
  isControlled = true,
}: FormDataType) => {
  const [showPassword, setShowPassword] = useState(false);

  const { colorMode } = useColorMode();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputElementProps = getInputElementProps({
    variant,
    placeholder,
  });

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
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
            isDisabled={!!isDisabled}
            leftIcon={!!leftIcon}
            isFloating={isFloating}
          >
            {type === "textarea" ? (
              <Textarea
                as={reactTextareaAutosize}
                {...inputElementProps}
                minH={0}
                minRows={5}
                maxRows={10}
                value={value}
                onChange={(value) => {
                  onChange(value);
                  backendError = undefined;
                }}
              />
            ) : type === "editor" ? (
              <CkEditor name={name} control={control} />
            ) : (
              <InputGroup>
                {leftIcon && (
                  <InputLeftElement mt={1} _groupFocus={{ textColor: "black" }}>
                    {leftIcon}
                  </InputLeftElement>
                )}
                <Input
                  pb={1}
                  type={
                    type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  {...inputElementProps}
                  onChange={(value) => {
                    onChange(value);
                    backendError = undefined;
                  }}
                  value={value}
                />

                {type === "password" && !rightIcon && (
                  <InputRightElement
                    mt={1}
                    _groupFocus={{ textColor: "black" }}
                    textColor={error ? "red.500" : "gray.500"}
                  >
                    <Button
                      onClick={handleShowPassword}
                      bg={"transparent"}
                      transition={"all 2s"}
                      _hover={{ bg: "transparent" }}
                      aria-label="Show Password"
                      color={"#000"}
                    >
                      <Icon
                        color={colorMode === "dark" ? "white" : "gray.700"}
                        as={showPassword ? EyeSlash : Eye}
                        boxSize={6}
                      />
                    </Button>
                  </InputRightElement>
                )}
                {rightIcon && type !== "password" && (
                  <InputRightElement mt={0.5}>{rightIcon}</InputRightElement>
                )}
              </InputGroup>
            )}
          </FormControl>
        );
      }}
    />
  ) : (
    <FormControl
      label={label}
      helperText={helperText}
      width={width}
      isRequired={!!isRequired}
      isReadOnly={!!isReadOnly}
      backendError={backendError}
      name={name}
      value={value}
      isDisabled={!!isDisabled}
    >
      <InputGroup>
        {leftIcon && (
          <InputLeftElement mt={1} _groupFocus={{ textColor: "black" }}>
            {leftIcon}
          </InputLeftElement>
        )}
        <Input
          pb={1}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...inputElementProps}
          onChange={onChange}
          value={value}
        />
        {rightIcon && type !== "password" && (
          <InputRightElement mt={0.5}>{rightIcon}</InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default TextInput;
