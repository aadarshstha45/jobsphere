import { useAddApplication } from "@/api/function/application";
import { useFetchResume } from "@/api/function/resume";
import { useCreateUserBehavior } from "@/api/function/userBehavior";
import { SelectInput } from "@/components/Form/Input";
import CkEditor from "@/components/Form/Input/Ckeditor";
import { ApplicationFormValues, ApplicationSchema } from "@/libs/schema/job";
import { getFieldErrors } from "@/utils/form";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResumeModal from "../Profile/Settings/panels/sections/Resume/ResumeModal";

interface ResumeOptionProps {
  label: string;
  value: string;
}
interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
  companyId: number;
  categoryId: number;
}

const ApplyModal = ({
  isOpen,
  onClose,
  jobId,
  companyId,
  categoryId,
}: ApplyModalProps) => {
  const defaultValues = {
    jobId,
    companyId,
    resumeId: "",
    coverLetter: "",
  };

  const createUserBehavior = useCreateUserBehavior();

  const { data: resumes } = useFetchResume();
  const { mutateAsync, isPending, isError, error } = useAddApplication();
  const [resumeOptions, setResumeOptions] = useState<ResumeOptionProps[]>([]);
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[]> | undefined
  >(undefined);
  const {
    isOpen: isResumeOpen,
    onOpen: onResumeOpen,
    onClose: onResumeClose,
  } = useDisclosure();

  if (isError) {
    setFieldErrors(getFieldErrors(error));
  }

  useEffect(() => {
    if (resumes && resumes.data.count > 0) {
      setResumeOptions(
        resumes.data.rows.map((resume) => ({
          label: resume.title,
          value: resume.id.toString(),
        }))
      );
    }
  }, [resumes]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(ApplicationSchema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isOpen]);

  const onApplicationSubmit = async (data: ApplicationFormValues) => {
    console.log({ data });
    const response = await mutateAsync(data);
    if (response.data.status === 1) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Apply for this job</ModalHeader>
        <ModalCloseButton
          border={"1px solid"}
          variant={"solid"}
          colorScheme="primary"
          borderRadius={"50%"}
        />
        <ModalBody
          maxH={window.innerHeight - 300}
          overflowY="auto"
          as={"form"}
          id="apply-form"
          display={"flex"}
          flexDir={"column"}
          gap={2}
          onSubmit={handleSubmit(onApplicationSubmit)}
          noValidate
        >
          <SelectInput
            control={control}
            name="resumeId"
            label="Select Resume"
            options={resumeOptions}
            backendError={fieldErrors?.resumeId}
            noOptionsMessage={() => "No resumes found."}
            isRequired
          />

          <ResumeModal isOpen={isResumeOpen} onClose={onResumeClose} />

          {resumes && resumes.data.count === 0 && (
            <Button
              onClick={onResumeOpen}
              w={"fit-content"}
              colorScheme={"primary"}
              size={"sm"}
            >
              Add Resume Here
            </Button>
          )}
          <CkEditor
            name="coverLetter"
            control={control}
            isRequired
            label="Cover Letter"
          />
        </ModalBody>
        <ModalFooter justifyContent={"space-between"}>
          <Button variant={"outline"} w="fit-content" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="apply-form"
            colorScheme="primary"
            w="fit-content"
            isLoading={isPending}
            rightIcon={<Icon as={ArrowRight} boxSize={5} />}
            onClick={() => {
              createUserBehavior.mutate({
                action: "apply",
                jobId,
                companyId,
                categoryId,
              });
            }}
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApplyModal;
