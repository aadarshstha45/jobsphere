import { useChangePassword } from "@/api/auth";
import { useUpdateCompany } from "@/api/functions/company";
import { RootInterface } from "@/api/functions/company/response";
import { TextInput } from "@/components/Form/Input";
import {
  Button,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Envelope, MapPin, Phone, Trash } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import * as yup from "yup";

const PasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required."),
  newPassword: yup.string().required("New password is required."),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("newPassword")], "Passwords did not match."),
});

type PasswordData = yup.InferType<typeof PasswordSchema>;

interface AccountProps {
  tab: string;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const Account = ({ tab, tabIndex, setTabIndex }: AccountProps) => {
  const data: RootInterface = useOutletContext();
  const { mutateAsync, isPending } = useUpdateCompany();
  const defaultValues = {
    mapUrl: "",
    phone: "",
    email: "",
    tab,
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const changePasswordForm = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(PasswordSchema),
  });
  const changePassword = useChangePassword();

  const handleChangePassword = async (data: PasswordData) => {
    console.log(data);
    await changePassword.mutateAsync({
      id: "",
      data,
    });
  };

  let fieldErrors: Record<string, string[]> | undefined = undefined;

  if (changePassword.isError) {
    fieldErrors =
      (
        changePassword.error?.response?.data as unknown as {
          error?: Record<string, string[]>;
        }
      )?.error ?? undefined;
  }

  useEffect(() => {
    if (data) {
      reset({
        mapUrl: data.data.mapUrl ?? "",
        phone: data.data.phone ?? "",
        email: data.data.user.email ?? "",
        tab,
      });
    }
  }, [data]);

  const onSubmit = async (data: typeof defaultValues) => {
    await mutateAsync({
      id: "",
      data,
    });
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <Text
        fontWeight={500}
        fontSize={{ base: "16px", md: "18px", xl: "22px" }}
      >
        Contact Information
      </Text>
      <form id="contact" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextInput
            control={control}
            label="Map Url"
            name="mapUrl"
            leftIcon={<Icon as={MapPin} boxSize={5} />}
          />
          <TextInput
            control={control}
            label="Phone"
            name="phone"
            leftIcon={<Icon as={Phone} boxSize={5} />}
          />
          <TextInput
            control={control}
            label="Email"
            name="email"
            helperText="Email cannot be changed."
            isReadOnly
            leftIcon={<Icon as={Envelope} boxSize={5} />}
          />

          <HStack gap={2} mt={4}>
            <Button onClick={() => setTabIndex(tabIndex - 1)}>Previous</Button>
            <Button
              form="contact"
              type="submit"
              variant="primary"
              isLoading={isPending}
              loadingText="Saving"
            >
              Finish
            </Button>
          </HStack>
        </Stack>
      </form>

      <Divider my={2} />

      <Text
        fontWeight={500}
        fontSize={{ base: "16px", md: "18px", xl: "22px" }}
      >
        Change Password
      </Text>

      <form
        noValidate
        onSubmit={changePasswordForm.handleSubmit(handleChangePassword)}
      >
        <SimpleGrid
          spacingX={6}
          spacingY={4}
          columns={{ base: 1, md: 2, xl: 3 }}
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <TextInput
              control={changePasswordForm.control}
              backendError={fieldErrors}
              label="Old Password"
              name="oldPassword"
              type="password"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <TextInput
              control={changePasswordForm.control}
              label="New Password"
              name="newPassword"
              type="password"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <TextInput
              control={changePasswordForm.control}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
        <Button
          mt={4}
          type="submit"
          variant="primary"
          isLoading={changePassword.isPending}
        >
          Change Password
        </Button>
      </form>

      <Divider my={2} />

      <Stack gap={2}>
        <Text
          fontWeight={500}
          fontSize={{ base: "16px", md: "18px", xl: "22px" }}
        >
          Delete Account
        </Text>
        <Text fontSize={"sm"} color={"gray.500"}>
          Once you delete your account, there is no going back. Please be
          certain.
        </Text>
        <Button
          variant={"outline"}
          leftIcon={<Icon as={Trash} boxSize={5} />}
          w={"fit-content"}
          colorScheme="red"
          mt={2}
        >
          Delete Account
        </Button>
      </Stack>
    </Flex>
  );
};

export default Account;
