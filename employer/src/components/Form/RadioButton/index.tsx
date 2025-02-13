import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

interface OptionProps {
  label: string;
  value: string;
}

interface RadioButtonProps {
  control: Control<any>;
  name: string;
  options: OptionProps[];
  label?: string;
  isRequired?: boolean;
  helperText?: string;
}

const RadioButton = ({
  control,
  name,
  options,
  label,
  isRequired,
  helperText,
}: RadioButtonProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl my={2} isInvalid={!!error} isRequired={!!isRequired}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            display={"flex"}
            gap={2}
            onChange={onChange}
            value={value}
          >
            {options.map((option, index) => (
              <Radio key={index} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
          {helperText && (
            <FormHelperText fontStyle={"italic"} color="gray.500">
              *{helperText}
            </FormHelperText>
          )}
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default RadioButton;
