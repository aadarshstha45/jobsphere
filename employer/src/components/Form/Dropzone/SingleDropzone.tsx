/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseURL } from "@/api/axiosSetup";
import {
  AspectRatio,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CloudArrowUp, Trash } from "@phosphor-icons/react";
import Dropzone from "react-dropzone";
import { Control, Controller, FieldErrors } from "react-hook-form";

type DropzoneProps = {
  name: string;
  control?: Control<any>;
  onDrop?: (acceptedFiles: any) => void;
  label?: string;
  onDelete: () => void;
  file: File | string | null;
  errors?: FieldErrors;
  isRequired?: boolean;
  helperText?: string;
  message?: string;
  maxSize?: number;
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
  errors,
}: DropzoneProps) {
  const { colorMode } = useColorMode();

  return (
    <FormControl
      w={{ base: "250px", md: "300px" }}
      mb={4}
      isRequired={isRequired}
    >
      <FormLabel fontSize={{ sm: "16px", md: "18px" }} fontWeight={450}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Dropzone
            onDrop={(acceptedFiles) => {
              field.onChange(acceptedFiles[0]); // Update form controller value
              onDrop && onDrop(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <AspectRatio ratio={1} w={{ base: "150px", md: "200px" }}>
                <Flex
                  mb={4}
                  flexDir="column"
                  {...getRootProps()}
                  border={"2px dashed rgba(200, 204, 209, 0.70)"}
                  bg={"rgba(241, 242, 244, 0.40)"}
                  borderWidth={2}
                  p={2}
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
                    </Flex>
                  )}

                  {file && (
                    <Flex
                      gap={2}
                      flexDir="column"
                      position="relative"
                      overflow={"hidden"}
                    >
                      <Image
                        w={"full"}
                        aspectRatio={1}
                        objectFit="cover"
                        objectPosition={"center"}
                        border={"1px"}
                        borderColor={"gray.500"}
                        borderRadius={"5px"}
                        src={
                          file
                            ? typeof file === "string"
                              ? `${BaseURL}/${file}`
                              : URL.createObjectURL(file)
                            : ""
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
                          onDelete();
                          field.onChange(null);
                        }}
                      />
                    </Flex>
                  )}
                </Flex>
              </AspectRatio>
            )}
          </Dropzone>
        )}
      />
      {message && (
        <FormHelperText
          color={colorMode === "light" ? "gray.800" : "gray.100"}
          fontSize="sm"
          textColor={"red.500"}
          fontStyle={"italic"}
        >
          {message}
        </FormHelperText>
      )}

      {helperText && (
        <FormHelperText
          color={colorMode === "light" ? "gray.800" : "gray.100"}
          fontSize="xs"
          fontStyle={"italic"}
        >
          {helperText}
        </FormHelperText>
      )}
      {errors && (
        <FormHelperText color="red.500" fontStyle={"italic"}>
          {(errors[name] as any)?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default SingleDropzone;
