import { useLoginUser } from "@/api/auth";
import { TextInput } from "@/components/Form/Input";
import {
  Button,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: ModalProps) => {
  const { mutateAsync, isPending } = useLoginUser();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const response = await mutateAsync(data);
    if (response.status === 200) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as={"form"}
          id="login-form"
          onSubmit={handleSubmit(onSubmit)}
          pb={6}
        >
          <Stack gap={1}>
            <TextInput
              control={control}
              label={"Email"}
              name={"email"}
              isRequired
            />
            <TextInput
              type="password"
              control={control}
              label={"Password"}
              name={"password"}
              isRequired
            />
            <Button
              rightIcon={<ArrowRight />}
              type={"submit"}
              w={"full"}
              colorScheme={"primary"}
              isLoading={isPending}
            >
              Sign In
            </Button>
            <ChakraLink
              textAlign={"center"}
              mt={2}
              color={"primary.500"}
              as={Link}
              to={"/register"}
            >
              Don't have an account? Register Here
            </ChakraLink>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
