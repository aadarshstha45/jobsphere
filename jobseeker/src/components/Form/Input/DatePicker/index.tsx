import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ResponsiveValue,
} from "@chakra-ui/react";
import { Calendar } from "@phosphor-icons/react";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller } from "react-hook-form";
import { FormControl, getInputElementProps } from "../config";
import "./style.css";

interface DatePickerProps {
  name: string;
  control: Control<any>;
  label: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFloating?: boolean;
  backendError?: Record<string, string[]>;
  showTimeSelect?: boolean;
  helperText?: string;
  width?: ResponsiveValue<string | number>;
  variant?: string;
}

const DatePicker = ({
  name,
  control,
  label,
  isReadOnly,
  isRequired,
  width,
  backendError,
  isFloating = true,
  showTimeSelect,
  helperText,
  variant,
}: DatePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const inputElementProps = getInputElementProps({
          variant,
        });

        const CustomInput = forwardRef<any, any>((props, ref) => {
          return (
            <InputGroup>
              <Input {...inputElementProps} {...props} ref={ref} />
              <InputRightElement
                userSelect="none"
                pointerEvents="none"
                children={<Icon as={Calendar} boxSize={6} />}
                mt={1}
              />
            </InputGroup>
          );
        });

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
            <ReactDatePicker
              customInput={<CustomInput width={"100%"} />}
              selected={value ? new Date(value) : null}
              value={value}
              onChange={(value) => {
                onChange(value);
                backendError = undefined;
              }}
              timeInputLabel="Time:"
              dateFormat={showTimeSelect ? "dd-MM-yyyy h:mm aa" : "dd-MM-yyyy"}
              showTimeInput={showTimeSelect}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </FormControl>
        );
      }}
    />
  );
};
export default DatePicker;
