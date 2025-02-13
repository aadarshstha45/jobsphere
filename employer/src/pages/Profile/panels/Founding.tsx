import { useUpdateCompany } from "@/api/functions/company";
import { RootInterface } from "@/api/functions/company/response";
import { useFetchIndustries } from "@/api/functions/jobs";
import { DatePicker, SelectInput, TextInput } from "@/components/Form/Input";
import { convertDate } from "@/libs/functions";
import { teamSizeOptions } from "@/libs/options";
import {
  Button,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ArrowRight, Link, MapPin } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

interface OptionInterface {
  label: string;
  value: string;
}
interface FoundingTabProps {
  tab: string;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const Founding = ({ tab, tabIndex, setTabIndex }: FoundingTabProps) => {
  const defaultValues = {
    teamSize: "",
    website: "",
    location: "",
    industryId: "",
    yearOfEstablishment: "",
    vision: "",
    tab,
  };
  const data: RootInterface = useOutletContext();
  const { data: industries } = useFetchIndustries();
  const { mutateAsync, isPending, error } = useUpdateCompany();

  const [industryOptions, setIndustryOptions] = useState<OptionInterface[]>([
    { label: "", value: "" },
  ]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    industries &&
      industries.data.count > 0 &&
      setIndustryOptions(
        industries.data.rows.map((industry) => ({
          label: industry.name,
          value: industry.id.toString(),
        }))
      );
  }, [industries]);

  useEffect(() => {
    if (data) {
      reset({
        teamSize: data.data.teamSize ?? "",
        website: data.data.website ?? "",
        location: data.data.location ?? "",
        industryId: data.data.industry?.id
          ? data.data.industry?.id.toString()
          : "",
        yearOfEstablishment: data.data.yearOfEstablishment ?? "",
        vision: data.data.vision ?? "",
        tab,
      });
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    const response = await mutateAsync({
      id: "",
      data: {
        ...data,
        yearOfEstablishment: convertDate(data.yearOfEstablishment),
      },
    });
    console.log({ response: response.status });
    if (response.status === 200) {
      setTabIndex(tabIndex + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid spacingX={6} spacingY={4} columns={{ base: 1, md: 2, xl: 3 }}>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            name="location"
            label="Location"
            leftIcon={<Icon as={MapPin} boxSize={5} />}
            control={control}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            name="website"
            leftIcon={<Icon as={Link} boxSize={5} />}
            label="Company Website"
            control={control}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <SelectInput
            name="teamSize"
            label="Team Size"
            control={control}
            options={teamSizeOptions}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <SelectInput
            options={industryOptions}
            name="industryId"
            label="Industry Type"
            backendError={error?.response?.data?.error as any}
            control={control}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <DatePicker
            name="yearOfEstablishment"
            label="Year of Establishment"
            control={control}
          />
        </GridItem>
      </SimpleGrid>
      <Stack my={2}>
        <TextInput
          type="editor"
          name="vision"
          isFloating={false}
          label="Vision"
          control={control}
        />
      </Stack>
      <HStack mt={4}>
        <Button onClick={() => setTabIndex(tabIndex - 1)}>Previous</Button>
        <Button
          isLoading={isPending}
          type="submit"
          variant="primary"
          rightIcon={<Icon as={ArrowRight} />}
        >
          Save and Next
        </Button>
      </HStack>
    </form>
  );
};

export default Founding;
