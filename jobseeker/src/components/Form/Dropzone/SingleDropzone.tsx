/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/api/axiosSetup";
import File from "@/assets/images/file.png";
import checkIfImage from "@/utils/checkIfImage";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Image,
  ResponsiveValue,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CloudArrowUp, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Control, Controller } from "react-hook-form";
type DropzoneProps = {
  name: string;
  control?: Control<any>;
  onDrop?: (acceptedFiles: any) => void;
  label?: string;
  onDelete: () => void;
  fieldErrors?: Record<string, string[]>;
  file: File | string | null;
  isRequired?: boolean;
  helperText?: string;
  message?: string;
  maxSize?: number;
  padding?: ResponsiveValue<string | number>;
  width?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  marginX?: ResponsiveValue<string | number>;
};

function SingleDropzone({
  name,
  control,
  message,
  onDrop,
  label,
  file,
  onDelete,
  isRequired,
  helperText,
  height,
  fieldErrors,
  width,
  padding,
  marginX,
}: DropzoneProps) {
  const { colorMode } = useColorMode();
  const [fieldError, setFieldError] = useState<
    DropzoneProps["fieldErrors"] | null
  >(null);

  useEffect(() => {
    setFieldError(fieldErrors);
  }, [fieldErrors]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          w={width ?? { base: "150px", md: "200px" }}
          my={2}
          isRequired={isRequired}
          isInvalid={!!error || !!fieldError?.[name]}
        >
          <FormLabel
            textColor={"gray.900"}
            fontSize={{ sm: "16px", md: "18px" }}
            fontWeight={450}
          >
            {label}
          </FormLabel>
          <Dropzone
            onDrop={(acceptedFiles) => {
              field.onChange(acceptedFiles[0]); // Update form controller value
              onDrop && onDrop(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Flex
                flexDir="column"
                {...getRootProps()}
                w={width ?? { base: "150px", md: "200px" }}
                h={height ?? { base: "150px", md: "200px" }}
                border={"2px dashed rgba(200, 204, 209, 0.70)"}
                bg={"rgba(241, 242, 244, 0.40)"}
                borderWidth={2}
                p={padding ?? 2}
                cursor={"pointer"}
                borderColor={"gray.500"}
                gap={4}
                align={"center"}
                textAlign={"center"}
                justify={"center"}
                borderRadius={"sm"}
              >
                <input {...getInputProps()} />
                {file === null && (
                  <Flex flexDir={"column"} gap={2} align={"center"}>
                    <Icon as={CloudArrowUp} boxSize={10} />
                    <Text>Select a file </Text>
                    {message && (
                      <Text
                        color={colorMode === "light" ? "gray.800" : "gray.100"}
                        fontSize="sm"
                      >
                        {message}
                      </Text>
                    )}
                  </Flex>
                )}

                {file && (
                  <Flex
                    gap={2}
                    flexDir="column"
                    position="relative"
                    overflow={"hidden"}
                    marginX={marginX}
                  >
                    <Image
                      w={"full"}
                      aspectRatio={1}
                      objectFit="cover"
                      objectPosition={"center"}
                      border={"1px"}
                      borderColor={"gray.500"}
                      borderRadius={"5px"}
                      padding={2}
                      src={
                        file
                          ? typeof file === "string"
                            ? checkIfImage(file)
                              ? `${BaseURL}/${file}` // If file is a string, treat it as a URL
                              : File
                            : file.type.startsWith("image/") // Check if it's an image file
                            ? URL.createObjectURL(file) // If it's an image file, create a URL object
                            : File // Fallback to a placeholder icon if it's not an image file
                          : "" // Fallback icon if no file is provided
                      }
                      alt={typeof file === "string" ? file : file.name}
                    />
                    {file && typeof file !== "string" && (
                      <Text
                        pos={"absolute"}
                        bottom={0}
                        left={0}
                        right={0}
                        bg={"white"}
                        opacity={0.9}
                        textColor={"black"}
                        fontSize={{ base: "xs", sm: "sm" }}
                        p={2}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"} // Prevent text wrapping
                        textOverflow={"ellipsis"} // Truncate text with ellipsis
                      >
                        {file.name}
                      </Text>
                    )}
                    <IconButton
                      alignSelf={"center"}
                      aria-label="Delete Image"
                      icon={<Trash />}
                      bg={"white"}
                      borderRadius={5}
                      opacity={0.8}
                      textColor="black"
                      size="sm"
                      position="absolute"
                      top={0}
                      right={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        setFieldError(null);
                        onDelete();
                        field.onChange(null);
                      }}
                    />
                  </Flex>
                )}
              </Flex>
            )}
          </Dropzone>
          {helperText && (
            <FormHelperText
              color={colorMode === "light" ? "gray.800" : "gray.100"}
              fontSize="xs"
              fontStyle={"italic"}
            >
              {helperText}
            </FormHelperText>
          )}
          <FormErrorMessage>{error?.message}</FormErrorMessage>
          {fieldError && (
            <FormErrorMessage>
              {fieldError[name] && fieldError[name]}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
}

export default SingleDropzone;
