/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActiveLabelStyles } from "@/hooks";
import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ResponsiveValue,
  Spinner,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { getInputElementProps } from "../Form/Input/config";
type SearchInputProps = {
  name: string;
  control?: Control<any>;
  isControlled?: boolean;
  type?: string;
  disabled?: boolean;
  isLoading?: boolean;
  value?: string;
  placeholder?: string;
  isFloating?: boolean;
  onSearch?: (data: string) => void;
  label?: string;
  width?: ResponsiveValue<string | number>;
  variant?: string;
};

export const SearchInput = ({
  name,
  type,
  isLoading,
  isControlled,
  value,
  isFloating = true,
  control,
  width,
  label,
  variant,
  onSearch = () => {},
  placeholder,
  ...extra
}: SearchInputProps) => {
  const activeLabelStyles = useActiveLabelStyles();

  const [searchString, setSearchString] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const inputElementProps = getInputElementProps({
    variant,
    placeholder,
  });

  const debouncedSearchFunction = useCallback(
    (value: string) => {
      onSearch(value);
      setIsDebouncing(false);
    },
    [onSearch]
  );

  const debouncedOnSearch = useMemo(() => {
    return debounce(debouncedSearchFunction, 500);
  }, [debouncedSearchFunction]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDebouncing(true);
    const value = e.target.value;
    setSearchString(value);
    debouncedOnSearch(value);
  };

  const floatingProps = isFloating
    ? {
        variant: "floating",
        _focusWithin: {
          label: {
            ...activeLabelStyles,
          },
        },
      }
    : {};

  const labelStyles = {
    left: 6,
    fontSize: {
      base: "14px",
      md: "16px",
    },
    textColor: "gray.500",
    htmlFor: name,
    _groupFocus: { textColor: isFloating ? "primary.500" : "gray.500" },
  };

  return isControlled ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl {...floatingProps} id={name} isInvalid={!!error}>
            {!isFloating && (
              <FormLabel {...labelStyles}>{label ?? "Search"}</FormLabel>
            )}
            <InputGroup alignContent={"center"}>
              <InputLeftElement mt={1}>
                {isLoading ? (
                  <Spinner color={"gray.500"} size={"sm"} />
                ) : (
                  <Icon as={MagnifyingGlass} color={"gray.500"} boxSize={5} />
                )}
              </InputLeftElement>
              <Input
                {...inputElementProps}
                value={value}
                name="search"
                onChange={(e) => {
                  onChange(e.target.value);
                  debouncedSearchFunction(e.target.value);
                }}
              />
            </InputGroup>
            <FormLabel {...labelStyles} sx={value ? activeLabelStyles : {}}>
              {label ?? "Search"}
            </FormLabel>
          </FormControl>
        );
      }}
    />
  ) : (
    <FormControl
      w={width ?? { base: "auto", sm: "250px" }}
      {...floatingProps}
      id={name}
    >
      {!isFloating && (
        <FormLabel {...labelStyles}>{label ?? "Search"}</FormLabel>
      )}
      <InputGroup>
        <InputLeftElement mt={1}>
          {isDebouncing ? (
            <Spinner color={"gray.500"} size={"sm"} />
          ) : (
            <Icon as={MagnifyingGlass} color={"gray.500"} boxSize={5} />
          )}
        </InputLeftElement>
        <Input
          name="search"
          type={type}
          value={value}
          {...inputElementProps}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch(searchString);
            }
          }}
          {...extra}
        />
      </InputGroup>
      {isFloating && (
        <FormLabel {...labelStyles} sx={searchString ? activeLabelStyles : {}}>
          {label ?? "Search"}
        </FormLabel>
      )}
    </FormControl>
  );
};
