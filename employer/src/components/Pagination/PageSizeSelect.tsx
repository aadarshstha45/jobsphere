/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActiveLabelStyles, useChakraSelectStyles } from "@/hooks";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select, SingleValue } from "chakra-react-select";

type SelectProps = {
  options: { value: number; label: string }[];
  pageSize?: number;
  setPageSize: (value: number) => void;
  width?: string;
  isFloating?: boolean;
};

const PageSizeSelect = ({
  options,
  pageSize,
  setPageSize,
  width,
  isFloating = true,
}: SelectProps) => {
  const activeLabelStyles = useActiveLabelStyles();
  const chakraStyles = useChakraSelectStyles();

  const floatingProps = {
    variant: "floating",
    _focusWithin: {
      label: {
        ...activeLabelStyles,
      },
    },
  };

  return (
    <FormControl
      {...(isFloating ? floatingProps : {})}
      w={width ?? "100%"}
      my={2}
    >
      <>
        <Select
          chakraStyles={chakraStyles}
          size={"sm"}
          menuPortalTarget={document.body}
          maxMenuHeight={200}
          value={options.find((option) => option.value === pageSize)} // Correctly match the value
          onChange={(newValue: unknown) => {
            const selectedOption = newValue as SingleValue<{
              value: number;
              label: string;
            }>;
            setPageSize(selectedOption!.value);
          }}
          selectedOptionStyle="check"
          focusBorderColor="primary.500"
          errorBorderColor="red.500"
          placeholder={""}
          options={options}
          useBasicStyles
          name="perPage"
        />
        {isFloating && (
          <FormLabel
            fontSize={{ base: "14px", md: "16px" }}
            htmlFor={"perPage"}
            textColor={"gray.500"}
            _groupFocus={{ textColor: "primary.500" }}
            sx={pageSize ? activeLabelStyles : {}}
          >
            Per Page
          </FormLabel>
        )}
      </>
    </FormControl>
  );
};

export default PageSizeSelect;
