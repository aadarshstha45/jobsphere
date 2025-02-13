import { useUpdateApplication } from "@/api/functions/application";
import { DatePicker, TextInput } from "@/components/Form/Input";
import RadioButton from "@/components/Form/RadioButton";
import { convertDate } from "@/libs/functions";
import {
  CandidateActionSchema,
  CandidateActionSchemaValues,
} from "@/libs/schema/application";
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { CaretDown, Check, ListDashes, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CandidateActionProps {
  id: string;
  status: string;
}

const candidateActionData = [
  {
    title: "Shortlist",
    action: "shortlisted",
    icon: ListDashes,
  },
  {
    title: "Accept",
    action: "accepted",
    icon: Check,
  },
  {
    title: "Reject",
    action: "rejected",
    icon: X,
  },
];

const CandidateAction = ({ id, status }: CandidateActionProps) => {
  const [action, setAction] = useState<string>("");

  const defaultValues = {
    applicationId: id,
    status: action,
    message: "",
    meetingTime: "" as never as Date,
    meetingType: "",
    meetingLink: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { control, handleSubmit, reset, getValues, setValue, watch } = useForm({
    defaultValues,
    resolver: yupResolver(CandidateActionSchema),
  });

  useEffect(() => {
    console.log(getValues());
  }, [getValues, setValue]);

  const { mutateAsync } = useUpdateApplication(id);

  const handleAction = (action: string) => {
    console.log({ action });
    setAction(action);
    onOpen();
  };

  const handleClose = () => {
    setAction("");
    reset(defaultValues);
    onClose();
  };

  const onSubmit = async (data: CandidateActionSchemaValues) => {
    console.log({ action });
    console.log(data);
    try {
      action === "accepted"
        ? await mutateAsync({
            id: data.applicationId,
            data: {
              ...data,
              status: action,
              meetingTime: convertDate(data.meetingTime!),
            },
          })
        : await mutateAsync({
            id: data.applicationId,
            data: {
              ...data,
              status: action,
            },
          });
      reset(defaultValues);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} motionPreset="slideInTop">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottom={"1px solid"}
            borderBottomColor={"gray.200"}
          >
            {action === "shortlisted" && "Shortlist Candidate"}
            {action === "rejected" && "Reject Candidate"}
            {action === "accepted" && "Accept Candidate"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={"form"}
            id="application-form"
            onSubmit={handleSubmit(onSubmit)}
            display={"flex"}
            flexDir={"column"}
            gap={4}
            noValidate
          >
            {action === "accepted" && (
              <>
                <DatePicker
                  name="meetingTime"
                  label="Meeting Time"
                  control={control}
                  showTimeSelect
                  isRequired
                />
                <RadioButton
                  control={control}
                  name="meetingType"
                  options={[
                    { label: "Online", value: "online" },
                    { label: "Offline", value: "offline" },
                  ]}
                  label="Meeting Type"
                  isRequired
                />

                <TextInput
                  control={control}
                  label="Meeting Link"
                  name="meetingLink"
                  helperText="Provide a link for the meeting if online"
                  isRequired={watch("meetingType") === "online"}
                />
              </>
            )}
            <TextInput
              name="message"
              label="Message"
              control={control}
              type="textarea"
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr={3} variant="outline">
              Close
            </Button>
            <Button
              type="submit"
              form="application-form"
              colorScheme={
                action === "accepted"
                  ? "primary"
                  : action === "shortlisted"
                  ? "teal"
                  : "red"
              }
            >
              {action === "shortlisted" && "Shortlist"}
              {action === "rejected" && "Reject"}
              {action === "accepted" && "Accept"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Menu placement="bottom-end">
        {status !== "accepted" && status !== "rejected" && (
          <MenuButton
            colorScheme="primary"
            as={Button}
            size={"md"}
            borderRadius={"3px"}
            rightIcon={<Icon as={CaretDown} size={32} />}
          >
            Action
          </MenuButton>
        )}

        <MenuList p={2}>
          {candidateActionData.map((item, index) => (
            <MenuItem
              as={Button}
              borderRadius={5}
              _hover={{ bg: "primary.100" }}
              key={index}
              onClick={() => handleAction(item.action)}
              rightIcon={<Icon as={item.icon} size={32} color="primary.500" />}
              justifyContent={"space-between"}
            >
              {item.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default CandidateAction;
