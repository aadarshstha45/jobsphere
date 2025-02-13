import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ResponsiveValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalPros {
  heading: string;
  isOpen: boolean;
  onClose: () => void;
  form: string;
  onSubmit: () => void;
  children: ReactNode;
  contentHeight?: ResponsiveValue<string | number>;
  bodyHeight?: ResponsiveValue<string | number>;
  isPending?: boolean;
}

const ModalForm = ({
  isOpen,
  onClose,
  form,
  heading,
  onSubmit,
  children,
  isPending,
}: ModalPros) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
      <ModalOverlay />
      <ModalContent
        pos={"fixed"}
        maxW={{ base: "95%", sm: "60%", md: "50%", lg: "40%", xl: "30%" }}
        h={"max-content"}
        maxH={window.innerHeight - 100}
        overflowY={"auto"}
      >
        <ModalHeader borderBottom={"1px solid"} borderBottomColor={"gray.200"}>
          {heading}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          py={4}
          minH={"min-content"}
          overflow={"auto"}
          display={"flex"}
          flexDir={"column"}
          gap={0}
          as={"form"}
          id={form}
          onSubmit={onSubmit}
        >
          {children}
        </ModalBody>
        <ModalFooter borderTop={"1px solid"} gap={2}>
          <Button onClick={onClose} variant={"outline"}>
            Close
          </Button>
          <Button
            isLoading={isPending}
            variant={"primary"}
            type="submit"
            form={form}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
