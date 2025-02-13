import { useUpdateCompany } from "@/api/functions/company";
import { RootInterface } from "@/api/functions/company/response";
import { SelectInput, TextInput } from "@/components/Form/Input";
import { socialMediaOptions } from "@/libs/options";
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { ArrowRight, XCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

interface SocialMediaItem {
  type: "facebook" | "youtube" | "twitter" | "instagram" | "linkedin";
  url: string;
}
interface SocialProps {
  tab: string;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const Social = ({ tab, tabIndex, setTabIndex }: SocialProps) => {
  const data: RootInterface = useOutletContext();

  const defaultValues = {
    socialMedia: [{ type: "", url: "" }],
    tab,
  };
  const { mutateAsync, isPending } = useUpdateCompany();

  const { control, getValues, setValue, reset, handleSubmit } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const [selectedOptions, setSelectedOptions] = useState(
    fields.map(() => ({
      value: "",
      label: "",
    }))
  );

  const [isLessThan1200] = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (data.data.socialMedia.length === 0) return;
    reset({
      socialMedia: data.data.socialMedia,
    });
    const initialSelectedOptions = data.data.socialMedia.map((item) => ({
      value: item.type,
      label:
        socialMediaOptions.find((option) => option.value === item.type)
          ?.label || "",
    }));
    setSelectedOptions(initialSelectedOptions);
  }, [data?.data?.socialMedia]);

  const handleAddField = () => {
    append({ type: "", url: "" });
    setSelectedOptions([
      ...selectedOptions,
      {
        value: "",
        label: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
    // setAvailableOptions([...availableOptions, removedOption]);
    remove(index);
  };

  const handleTypeChange = (
    index: number,
    selectedOption: { value: string; label: string }
  ) => {
    setValue(`socialMedia.${index}.type`, selectedOption.value);
    setValue(`socialMedia.${index}.url`, ""); // Reset URL when type changes
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = selectedOption;
    setSelectedOptions(newSelectedOptions);
  };

  const renderSocialInputs = () => {
    return fields.map((field, index) => {
      const type = getValues(`socialMedia.${index}.type`);
      const availableOptions = socialMediaOptions.filter(
        (option) =>
          !selectedOptions.some((selected) => selected.value === option.value)
      );
      return (
        <HStack
          flexWrap={isLessThan1200 ? "wrap" : "nowrap"}
          align={"center"}
          gap={{ lg: 4 }}
          key={field.id}
          w={"100%"}
        >
          <SelectInput
            isControlled={false}
            width={isLessThan1200 ? "100%" : "25%"}
            name={`socialMedia.${index}.type`}
            options={availableOptions}
            handleChange={(selectedOption: { label: string; value: string }) =>
              handleTypeChange(index, selectedOption)
            }
            value={socialMediaOptions.find((option) => option.value === type)}
            label={`Social Link ${index + 1}`}
          />
          <Box width={isLessThan1200 ? "100%" : "75%"}>
            <TextInput
              control={control}
              name={`socialMedia.${index}.url`}
              label={
                socialMediaOptions.find((option) => option.value === type)
                  ?.label || "Social Media URL"
              }
            />
          </Box>
          {fields.length > 1 && (
            <Button onClick={() => handleRemove(index)}>
              <Icon as={XCircle} boxSize={6} />
            </Button>
          )}
          <Divider
            my={4}
            display={
              isLessThan1200 && index !== fields.length - 1 ? "flex" : "none"
            }
          />
        </HStack>
      );
    });
  };

  const onSubmit = async (data: typeof defaultValues) => {
    const socialMediaLinks = data.socialMedia.reduce<
      Record<SocialMediaItem["type"], string | null>
    >(
      (acc, item) => {
        acc[item.type as SocialMediaItem["type"]] = item.url;
        return acc;
      },
      {
        facebook: null,
        youtube: null,
        twitter: null,
        instagram: null,
        linkedin: null,
      }
    );

    const response = await mutateAsync({
      id: "",
      data: {
        ...socialMediaLinks,
        tab,
      },
    });
    if (response.status === 200) {
      setTabIndex(tabIndex + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        {renderSocialInputs()}
        <Stack gap={2} w={"fit-content"}>
          {fields.length < socialMediaOptions.length && (
            <Button onClick={handleAddField}>Add More Social Media</Button>
          )}
          <HStack w={"fit-content"} mt={4}>
            <Button onClick={() => setTabIndex(tabIndex - 1)}>Previous</Button>
            <Button
              isLoading={isPending}
              type="submit"
              variant="primary"
              rightIcon={<Icon as={ArrowRight} />}
            >
              Save & Next
            </Button>
          </HStack>
        </Stack>
      </Stack>
    </form>
  );
};

export default Social;
