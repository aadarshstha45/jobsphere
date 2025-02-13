import {
  useAddResume,
  useFetchSingleResume,
  useUpdateResume,
} from "@/api/function/resume";
import { SingleDropzone } from "@/components/Form/Dropzone";
import { TextInput } from "@/components/Form/Input";
import { ModalForm } from "@/components/Form/Modal";
import { ResumeFormValues, ResumeSchema } from "@/libs/schema/resume";
import { getFieldErrors } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
  setId?: Dispatch<SetStateAction<string | null>>;
}

const ResumeModal = ({ isOpen, onClose, id, setId }: ResumeModalProps) => {
  const defaultValues = {
    title: "",
    resume: "",
  };

  const {
    mutateAsync: editResume,
    isPending: isResumeEditing,
    isError: isEditError,
    error: editError,
  } = useUpdateResume();

  const { data: singleResume } = useFetchSingleResume(id!);
  const { mutateAsync, error, isError, isPending } = useAddResume();
  const [file, setFile] = useState<File | string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[]> | undefined
  >(undefined);
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(ResumeSchema),
  });
  useEffect(() => {
    if (id && singleResume) {
      reset({
        title: singleResume.data.title,
        resume: singleResume.data.resume,
      });
      setFile(singleResume.data.resume);
    }
    setFieldErrors(undefined);
  }, [id, singleResume]);

  useEffect(() => {
    if (isError || isEditError) {
      setFieldErrors(getFieldErrors(error! || editError!));
    }
  }, [isError, isEditError]);

  const onSubmit = async (data: ResumeFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (file && (file instanceof File || typeof file === "string")) {
      formData.append("resume", file);
    }
    let response = null;
    if (id) {
      response = await editResume({ id, data: formData });
    } else {
      response = await mutateAsync(formData);
    }
    if (response.data.status === 1) {
      if (setId) {
        setId(null);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    if (setId) {
      setId(null);
    }
    setFieldErrors(undefined);
    reset(defaultValues);
  };

  return (
    <ModalForm
      form="resume-form"
      isOpen={isOpen}
      onClose={handleClose}
      heading={id ? "Edit Resume" : "Add Resume"}
      contentHeight={"max-content"}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending || isResumeEditing}
    >
      <TextInput
        name="title"
        label="CV/Resume Title"
        control={control}
        backendError={fieldErrors?.title}
      />
      <SingleDropzone
        width={"full"}
        height={"300px"}
        padding={6}
        marginX={10}
        name="resume"
        control={control}
        fieldErrors={fieldErrors}
        file={file}
        helperText="Only PDF files are allowed"
        message="Drag and drop your CV/Resume here"
        onDelete={() => setFile(null)}
        onDrop={(acceptedFiles) => {
          setFile(acceptedFiles[0]);
        }}
      />
    </ModalForm>
  );
};

export default ResumeModal;
