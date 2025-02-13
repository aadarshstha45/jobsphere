import { useUpdatePassword, useUpdateUser } from "@/api/auth";
import { RootInterface } from "@/api/auth/response";
import { TextInput } from "@/components/Form/Input";
import { PasswordFormValues, PasswordSchema } from "@/libs/schema/user";
import { getDirtyData, getFieldErrors } from "@/utils/form";
import {
  Button,
  Divider,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

interface AccountProps {
  tab: string;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const Account = ({ tab, tabIndex, setTabIndex }: AccountProps) => {
  const data: RootInterface = useOutletContext();

  const updatePassword = useUpdatePassword();
  const updateUser = useUpdateUser();

  const defaultContactValues: Record<string, any> = {
    tab,
    email: "",
    phone: "",
    mapUrl: "",
  };

  const defaultPasswordValues = {
    tab,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const contactForm = useForm({
    defaultValues: defaultContactValues,
    mode: "onBlur",
  });

  const passwordForm = useForm({
    defaultValues: defaultPasswordValues,
    resolver: yupResolver(PasswordSchema),
    mode: "all",
  });

  let passwordFieldErrors = undefined;
  let contactFieldErrors = undefined;

  if (updatePassword.isError) {
    passwordFieldErrors = getFieldErrors(updatePassword.error);
  }

  if (updateUser.isError) {
    contactFieldErrors = getFieldErrors(updateUser.error);
  }
  const isContactFormTouched = contactForm.formState.isDirty;

  const isPasswordFormTouched = passwordForm.formState.isDirty;

  useEffect(() => {
    if (data) {
      contactForm.reset({
        email: data.data.email ?? "",
        phone: data.data.jobseeker.phone ?? "",
        mapUrl: data.data.jobseeker.mapUrl ?? "",
        tab,
      });
    }
  }, [data, contactForm.reset]);

  const onContactFormSubmit = async (data: typeof defaultContactValues) => {
    const dirtyData = getDirtyData(contactForm.formState, data);
    await updateUser.mutateAsync({
      id: "",
      data: {
        ...dirtyData,
        tab,
      },
    });
    console.log({ dirtyData });
  };

  const onPasswordFormSubmit = async (data: PasswordFormValues) => {
    await updatePassword.mutateAsync({
      id: "",
      data,
    });
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Contact Information
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        as={"form"}
        id="contact-form"
        onSubmit={contactForm.handleSubmit(onContactFormSubmit)}
        flexDir={"column"}
        spacingX={6}
        spacingY={4}
        noValidate
      >
        <GridItem colSpan={1}>
          <TextInput
            control={contactForm.control}
            name={"email"}
            label={"Email"}
            helperText="Email cannot be changed."
            isReadOnly
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            control={contactForm.control}
            name={"phone"}
            label={"Phone"}
            backendError={contactFieldErrors?.phone}
            isRequired
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            control={contactForm.control}
            name={"mapUrl"}
            label={"MapUrl"}
            backendError={contactFieldErrors?.mapUrl}
            helperText="Enter the URL of your location on Google Maps."
          />
        </GridItem>
      </SimpleGrid>
      <HStack spacing={4} flexWrap={"wrap"}>
        <Button w={"fit-content"} onClick={() => setTabIndex(tabIndex - 1)}>
          Previous
        </Button>
        <Button
          w={"fit-content"}
          type="submit"
          form="contact-form"
          variant="primary"
          isDisabled={!isContactFormTouched}
        >
          Save Changes
        </Button>
      </HStack>
      <Divider my={4} />
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Change Password
      </Text>
      <SimpleGrid
        as={"form"}
        id={"password-form"}
        onSubmit={passwordForm.handleSubmit(onPasswordFormSubmit)}
        columns={{ base: 1, md: 2, xl: 3 }}
        spacing={4}
        noValidate
      >
        <GridItem colSpan={1}>
          <TextInput
            isRequired
            control={passwordForm.control}
            name={"oldPassword"}
            label={"Current Password"}
            backendError={passwordFieldErrors?.oldPassword}
            type={"password"}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <TextInput
            isRequired
            control={passwordForm.control}
            name={"newPassword"}
            label={"New Password"}
            backendError={passwordFieldErrors?.newPassword}
            type={"password"}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <TextInput
            isRequired
            control={passwordForm.control}
            name={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
          />
        </GridItem>
      </SimpleGrid>
      <Button
        w={"fit-content"}
        type="submit"
        form="password-form"
        variant="primary"
        isDisabled={!isPasswordFormTouched}
        isLoading={updatePassword.isPending}
      >
        Change Password
      </Button>
    </Flex>
  );
};

export default Account;
