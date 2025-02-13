import { useUpdateUser } from "@/api/auth";
import { RootInterface } from "@/api/auth/response";
import { SingleDropzone } from "@/components/Form/Dropzone";
import {
  DatePicker,
  SelectInput,
  TagInput,
  TextInput,
} from "@/components/Form/Input";
import { convertDate } from "@/libs/functions";
import { educationOptions, experienceOptions } from "@/libs/options";
import { getDirtyData } from "@/utils/form";
import {
  Button,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import Resume from "./sections/Resume";

interface PersonalProps {
  tab: string;
}

const Personal = ({ tab }: PersonalProps) => {
  const defaultValues: Record<string, any> = {
    tab,
    profilePicture: null,
    name: "",
    tags: "",
    gender: "",
    experience: "",
    education: "",
    biography: "",
    website: "",
    dateOfBirth: "" as never as Date,
  };

  const data: RootInterface = useOutletContext();
  const [picture, setPicture] = useState<File | string | null>(null);
  const [isLessThan1200] = useMediaQuery("(max-width: 1200px)");

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.name,
        gender: data.data.jobseeker.gender ?? "",
        experience: data.data.jobseeker.experience ?? "",
        education: data.data.jobseeker.education ?? "",
        website: data.data.jobseeker.website ?? "",
        biography: data.data.jobseeker.biography ?? "",
        tags: data.data.jobseeker.tags
          ? JSON.parse(data.data.jobseeker.tags)
          : "",
        dateOfBirth: data.data.jobseeker.dateOfBirth ?? "",
        tab,
      });
      setPicture(data.data.jobseeker.profilePicture || null);
    }
  }, [data, reset]);

  const { mutateAsync, isPending, error } = useUpdateUser();

  const fieldErrors: Record<string, string[]> =
    (
      error?.response?.data as unknown as {
        error?: Record<string, string[]>;
      }
    )?.error ?? {};

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = new FormData();
    const dirtyData = getDirtyData(formState, data);
    console.log("dirtyData", dirtyData);
    // Append profilePicture if it's a dirty field and a valid File or string
    if (dirtyData.tags.length > 0) {
      formData.append("tags", JSON.stringify(dirtyData.tags));
    }
    if (
      dirtyData.profilePicture &&
      picture &&
      (picture instanceof File || typeof picture === "string")
    ) {
      formData.append("profilePicture", picture);
    }

    // Append dateOfBirth if it's a dirty field and exists
    if (dirtyData.dateOfBirth) {
      formData.append("dateOfBirth", convertDate(data.dateOfBirth));
    }

    // Append only dirty fields from data
    Object.keys(dirtyData).forEach((key) => {
      if (key !== "profilePicture" && key !== "dateOfBirth" && key !== "tags") {
        // Ensure the value exists before appending
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
    });

    try {
      // Assuming mutateAsync is an async function to submit the form data
      await mutateAsync({
        id: "", // Ensure this ID is correctly assigned or passed as needed
        data: formData,
      });
    } catch (error) {
      console.error("Submission failed:", error);
      // Handle error (e.g., show a notification or message to the user)
    }
  };

  return (
    <Flex flexDir={"column"} gap={4} mt={2}>
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Basic Information
      </Text>
      <Flex
        as={"form"}
        id="personal-form"
        onSubmit={handleSubmit(onSubmit)}
        gap={12}
        flexDir={isLessThan1200 ? "column" : "row"}
      >
        <SingleDropzone
          file={picture}
          onDrop={(acceptedFiles) => {
            setPicture(acceptedFiles[0]);
          }}
          onDelete={() => setPicture(null)}
          name={"profilePicture"}
          control={control}
          label={"Profile Picture"}
        />
        <Flex flexDir={"column"} gap={2}>
          <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            spacingX={4}
            spacingY={2}
            w={"full"}
            h={"full"}
          >
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput name={"name"} control={control} label={"Name"} />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <SelectInput
                control={control}
                name="gender"
                label="Gender"
                backendError={fieldErrors?.gender}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Others", value: "others" },
                ]}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <SelectInput
                control={control}
                name="experience"
                label="Experience"
                options={experienceOptions}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <SelectInput
                control={control}
                name="education"
                label="Education"
                options={educationOptions}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <DatePicker
                control={control}
                name="dateOfBirth"
                label="Date Of Birth"
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput control={control} name="website" label="Website" />
            </GridItem>
            <GridItem colSpan={2}>
              <TagInput
                control={control}
                name="tags"
                label="Keywords"
                type="editor"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <TextInput
                control={control}
                name="biography"
                label="Biography"
                type="textarea"
                helperText="Write a short description about yourself."
              />
            </GridItem>
          </SimpleGrid>
          <Button
            w={"fit-content"}
            type="submit"
            form="personal-form"
            variant="primary"
            isLoading={isPending}
          >
            Save Changes
          </Button>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Resume />
    </Flex>
  );
};

export default Personal;
