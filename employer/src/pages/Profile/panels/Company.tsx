import { useUpdateCompany } from "@/api/functions/company";
import { RootInterface } from "@/api/functions/company/response";
import { SingleDropzone } from "@/components/Form/Dropzone";
import { TextInput } from "@/components/Form/Input";
import TagInput from "@/components/Form/Input/TagInput";
import { Button, Divider, Flex, Icon } from "@chakra-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

interface CompanyTabProps {
  tab: string;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const Company = ({ tab, tabIndex, setTabIndex }: CompanyTabProps) => {
  const { mutateAsync } = useUpdateCompany();
  const data: RootInterface = useOutletContext();
  const [file, setFile] = useState<File | string | null>(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      logo: null,
      name: "",
      aboutUs: "",
      tags: "",
      tab,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data.data.aboutUs);
      reset({
        name: data.data.name ?? "",
        aboutUs: data.data.aboutUs ?? "",
        tags: data.data.tags ? JSON.parse(data.data.tags) : "",
      });

      setFile(data.data.logo ?? null);
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (file) {
      formData.append("logo", file);
    }
    formData.append("name", data.name);
    formData.append("aboutUs", data.aboutUs);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("tab", tab);
    await mutateAsync({
      id: "",
      data: formData,
    });
    setTabIndex(tabIndex + 1);
  };

  const onDelete = () => {
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={2} flexDir={"column"}>
        <SingleDropzone
          control={control}
          name="logo"
          label="Company Logo"
          file={file}
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles[0]);
          }}
          onDelete={onDelete}
        />

        <Divider my={4} />

        <TextInput
          width={{ md: "500px" }}
          name="name"
          label="Company Name"
          control={control}
        />

        <TagInput control={control} name="tags" label="Company Keywords" />

        <TextInput
          type="editor"
          isFloating={false}
          name="aboutUs"
          label="About Us"
          control={control}
        />

        <Button
          variant={"primary"}
          w={"fit-content"}
          type="submit"
          rightIcon={<Icon as={ArrowRight} />}
        >
          Save and Next
        </Button>
      </Flex>
    </form>
  );
};

export default Company;
