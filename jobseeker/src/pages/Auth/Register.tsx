import { useRegisterUser } from "@/api/auth";
import LoginBanner from "@/assets/images/login.png";
import { TextInput } from "@/components/Form/Input";
import { RegisterSchema } from "@/libs/schema";
import { RegisterFormValues } from "@/libs/schema/user";
import { getFieldErrors } from "@/utils/form";
import {
  Button,
  Link as ChakraLink,
  Checkbox,
  Container,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight, Briefcase } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: "jobseeker",
};

const Register = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(RegisterSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync, isPending, error, isError } = useRegisterUser();

  const onSubmit = async (data: RegisterFormValues) => {
    await mutateAsync(data);
    navigate("/", { replace: true });
  };

  let fieldErrors = undefined;
  if (isError) {
    fieldErrors = getFieldErrors(error);
  }
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} h={"100vh"}>
      <GridItem h={"full"} w={"full"} colSpan={1}>
        <HStack as={Link} to={"/"} p={{ base: 4, md: 10 }}>
          <Icon
            as={Briefcase}
            boxSize={8}
            color={"primary.500"}
            h={"inherit"}
          />
          <Text fontWeight={400} color={"primary.500"} fontSize={"lg"}>
            JobSphere
          </Text>
        </HStack>
        <Container
          maxW={{
            base: "98vw",
            sm: "85vw",
            md: "50vw",
            lg: "40vw",
            xl: "30vw",
          }}
        >
          <Flex flexDir={"column"} justify={"center"} gap={4}>
            <Text
              textAlign={"left"}
              fontWeight={500}
              fontSize={{ base: "xl", md: "3xl" }}
            >
              Sign Up
            </Text>
            <HStack gap={2}>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Already have an account?
              </Text>
              <ChakraLink as={Link} to={"/login"} color={"primary.500"}>
                Sign In
              </ChakraLink>
            </HStack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack gap={1}>
                <TextInput
                  control={control}
                  label={"Name"}
                  name={"name"}
                  backendError={fieldErrors?.name}
                  isRequired
                />

                <TextInput
                  control={control}
                  label={"Email"}
                  name={"email"}
                  backendError={fieldErrors?.email}
                  isRequired
                />
                <TextInput
                  type="password"
                  control={control}
                  label={"Password"}
                  name={"password"}
                  backendError={fieldErrors?.password}
                  isRequired
                />
                <TextInput
                  type="password"
                  control={control}
                  label={"Confirm Password"}
                  name={"confirmPassword"}
                  isRequired
                />

                <HStack my={4}>
                  <Checkbox
                    onChange={() => setIsChecked(!isChecked)}
                    colorScheme="primary"
                  >
                    I've read and agree to the{" "}
                    <ChakraLink color={"primary.500"} as={Link} to="/terms">
                      Terms and Conditions
                    </ChakraLink>
                  </Checkbox>
                </HStack>

                <Button
                  rightIcon={<ArrowRight />}
                  type={"submit"}
                  colorScheme={"primary"}
                  w={"full"}
                  isLoading={isPending}
                  isDisabled={!isChecked}
                >
                  Create Account
                </Button>
              </Stack>
            </form>
          </Flex>
        </Container>
      </GridItem>
      <GridItem
        overflowY={"hidden"}
        display={{ base: "none", md: "block" }}
        colSpan={1}
      >
        <Image
          h={"full"}
          w={"full"}
          objectFit={"cover"}
          objectPosition={"left"}
          src={LoginBanner}
          alt={"Login Banner"}
        />
      </GridItem>
    </SimpleGrid>
  );
};

export default Register;
