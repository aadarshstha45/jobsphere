import {
  useAddJob,
  useFetchJobById,
  useFetchJobCategories,
  useUpdateJob,
} from "@/api/functions/jobs";
import { SingleDataInterface } from "@/api/functions/jobs/response";
import {
  DatePicker,
  SelectInput,
  TagInput,
  TextInput,
} from "@/components/Form/Input";
import StatusRadio from "@/components/Form/StatusRadio";
import { convertDate } from "@/libs/functions";
import {
  educationOptions,
  experienceOptions,
  jobLevelOptions,
  jobTypeOptions,
} from "@/libs/options";
import { JobSchema } from "@/libs/schema";
import { JobFormValues } from "@/libs/schema/job";
import {
  Button,
  Container,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight } from "@phosphor-icons/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface OptionType {
  value: string;
  label: string;
}

const SalaryTypeOptions = [
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "unpaid",
    label: "Unpaid",
  },
  {
    value: "negotiable",
    label: "Negotiable",
  },
];

const defaultValues = {
  title: "",
  tags: [], // Change undefined to an empty string
  salaryType: "",
  minSalary: "" as never as number,
  maxSalary: "" as never as number,
  education: "",
  experience: "",
  jobType: "",
  categoryId: "",
  vacancies: "" as never as number,
  expiryDate: "" as never as Date,
  jobLevel: "",
  description: "",
  isActive: "true",
  responsibilities: "",
};
const Jobs = () => {
  const { id } = useParams();
  const addJob = useAddJob();
  const editJob = useUpdateJob();
  const { data: job } = useFetchJobById(id!);

  const { data: categories } = useFetchJobCategories();

  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([
    {
      label: "",
      value: "",
    },
  ]);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<JobFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(JobSchema),
  });

  useEffect(() => {
    if (categories && categories.data.rows.length > 0) {
      const options = categories.data.rows.map((category) => ({
        label: category.name,
        value: category.id.toString(),
      }));
      setCategoryOptions(options);
    }
  }, [categories]);

  console.log({
    errors,
  });

  const [isPaid, setIsPaid] = useState<boolean | null>(null);

  useEffect(() => {
    if (job) {
      console.log({ job });
      reset({
        title: job.data.title ?? "",
        tags: job.data.tags ?? [],
        salaryType: job.data.salaryType ?? "",
        minSalary: job.data.minSalary ?? ("" as never as number),
        maxSalary: job.data.maxSalary ?? ("" as never as number),
        education: job.data.education ?? "",
        experience: job.data.experience ?? "",
        categoryId: job.data.category ? job.data.category.id.toString() : "",
        jobType: job.data.jobType ?? "",
        vacancies: job.data.vacancies ?? ("" as never as number),
        expiryDate: new Date(job.data.expiryDate) ?? ("" as never as Date),
        jobLevel: job.data.jobLevel ?? "",
        isActive: job.data.isActive ? "true" : "false",
        description: job.data.description ?? "",
        responsibilities: job.data.responsibilities ?? "",
      });
      setIsPaid(job.data.salaryType === "paid");
    }
  }, [job, reset]);

  const onSubmit = async (data: JobFormValues) => {
    const expiryDate = convertDate(data.expiryDate);
    console.log({
      ...data,
      expiryDate,
    });
    let response: AxiosResponse<SingleDataInterface>; // Declare the 'response' variable
    if (id) {
      response = await editJob.mutateAsync({
        id,
        data: {
          ...data,
          expiryDate,
        },
      });
    } else {
      response = await addJob.mutateAsync({
        ...data,
        expiryDate,
      });
    }
    console.log(response.data);
    if (response.data.status === 1) {
      reset(defaultValues);
      navigate("/jobs");
    }
  };

  const fieldError: Record<string, string[]> | undefined =
    (
      addJob.error?.response?.data as unknown as {
        error?: Record<string, string[]>;
      }
    )?.error ??
    (
      editJob.error?.response?.data as unknown as {
        error?: Record<string, string[]>;
      }
    )?.error ??
    undefined;

  return (
    <Container
      maxW={{ base: "100vw", sm: "90vw", md: "80vw", xl: "70vw" }}
      mx={0}
      px={0}
      py={4}
    >
      <form id="jobForm" onSubmit={handleSubmit(onSubmit)} noValidate>
        <SimpleGrid
          spacingX={{ base: 2, md: 6 }}
          spacingY={2}
          columns={{ base: 1, sm: 2, xl: 3 }}
        >
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <TextInput
              control={control}
              label="Job Title"
              name="title"
              backendError={fieldError}
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <SelectInput
              control={control}
              label="Job Category"
              name="categoryId"
              options={categoryOptions}
              backendError={fieldError}
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <TagInput control={control} label="Tags" name="tags" />
          </GridItem>
          <GridItem mt={6} pb={0} colSpan={{ base: 2, xl: 3 }}>
            <Text
              fontWeight={500}
              fontSize={{ base: "18px", md: "22px", xl: "24px" }}
            >
              Salary
            </Text>
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <SelectInput
              options={SalaryTypeOptions}
              control={control}
              name="salaryType"
              label="Salary Type"
              handleChange={(selectedOption: OptionType) => {
                console.log(selectedOption);
                setIsPaid(selectedOption.value === "paid");
              }}
              backendError={fieldError}
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 2 }}></GridItem>
          <GridItem
            colSpan={{ base: 2, sm: 1 }}
            opacity={isPaid ? 1 : 0}
            transition={isPaid ? "opacity 0.3s ease-in-out" : ""}
            pos={isPaid ? "static" : "absolute"}
            pointerEvents={isPaid ? "auto" : "none"}
          >
            <TextInput
              type="number"
              control={control}
              name="minSalary"
              label="Min Salary"
              backendError={fieldError}
              isRequired
            />
          </GridItem>
          <GridItem
            colSpan={{ base: 2, sm: 1 }}
            opacity={isPaid ? 1 : 0}
            transition={isPaid ? "opacity 0.3s ease-in-out" : ""}
            pos={isPaid ? "static" : "absolute"}
            pointerEvents={isPaid ? "auto" : "none"}
          >
            <TextInput
              type="number"
              control={control}
              name="maxSalary"
              label="Max Salary"
              isRequired
            />
          </GridItem>
          <GridItem mt={6} pb={0} colSpan={{ base: 2, md: 2, xl: 3 }}>
            <Text
              fontWeight={500}
              fontSize={{ base: "18px", md: "22px", xl: "24px" }}
            >
              Advance Information
            </Text>
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <SelectInput
              options={educationOptions}
              control={control}
              name="education"
              label="Education"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <SelectInput
              options={experienceOptions}
              control={control}
              name="experience"
              label="Experience"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <SelectInput
              options={
                watch("salaryType") === "unpaid" ? jobTypeOptions.filter((option) => option.value === "internship") : jobTypeOptions
              }
              control={control}
              name="jobType"
              label="Job Type"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <SelectInput
              options={jobLevelOptions}
              control={control}
              name="jobLevel"
              label="Job Level"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <TextInput
              control={control}
              label="Vacancies"
              name="vacancies"
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 1 }}>
            <DatePicker
              backendError={fieldError}
              control={control}
              name="expiryDate"
              label="Expires On"
              isRequired
            />
          </GridItem>
          {id && (
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <StatusRadio control={control} />
            </GridItem>
          )}
          <GridItem mt={6} pb={0} colSpan={{ base: 2, md: 2, xl: 3 }}>
            <Text
              fontWeight={500}
              fontSize={{ base: "18px", md: "22px", xl: "24px" }}
            >
              Description and Responsibilities
            </Text>
          </GridItem>
          <GridItem mt={6} pb={0} colSpan={{ base: 2, md: 2, xl: 3 }}>
            <TextInput
              control={control}
              type="editor"
              name="description"
              label="Description"
              isFloating={false}
            />
          </GridItem>
          <GridItem mt={6} pb={0} colSpan={{ base: 2, md: 2, xl: 3 }}>
            <TextInput
              control={control}
              type="editor"
              name="responsibilities"
              label="Responsibilities"
              isFloating={false}
            />
          </GridItem>
        </SimpleGrid>
        <Button
          form="jobForm"
          type="submit"
          colorScheme="blue"
          my={2}
          variant={"primary"}
          isLoading={id ? editJob.isPending : addJob.isPending}
          rightIcon={<ArrowRight weight="bold" size={24} />}
        >
          {id ? "Edit" : "Add"}
        </Button>
      </form>
    </Container>
  );
};

export default Jobs;
