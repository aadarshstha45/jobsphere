/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterUser } from "@/api/auth";
import LoginBanner from "@/assets/images/login.png";
import { TextInput } from "@/components/Form/Input";
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
  useToast,
} from "@chakra-ui/react";
import {
  ArrowRight,
  At,
  Briefcase,
  LinkSimple,
  Lock,
  MapPin,
  User,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const showToast = useToast();
  const { mutateAsync, isPending } = useRegisterUser();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      website: "",
      userType: "employer",
    },
  });
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      showToast({
        title: "Password does not match",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    await mutateAsync(data);
  };

  const [isChecked, setIsChecked] = useState(false);
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} h={"100vh"}>
      <GridItem h={"full"} w={"full"} colSpan={1}>
        <HStack py={10}>
          <Icon
            as={Briefcase}
            boxSize={8}
            color={"primary.500"}
            h={"inherit"}
          />
          <Text fontSize={"lg"}>JobSphere</Text>
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
              <Stack gap={0}>
                <TextInput
                  name="name"
                  label="Name"
                  control={control}
                  isRequired={true}
                  leftIcon={<User />}
                />
                <TextInput
                  name="email"
                  label="Email"
                  control={control}
                  isRequired={true}
                  leftIcon={<At />}
                />
                <TextInput
                  name="password"
                  label="Password"
                  control={control}
                  type="password"
                  isRequired={true}
                  leftIcon={<Lock />}
                />
                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  control={control}
                  type="password"
                  isRequired={true}
                  leftIcon={<Lock />}
                />
                <TextInput
                  name="location"
                  label="Location"
                  control={control}
                  isRequired={true}
                  leftIcon={<MapPin />}
                />
                <TextInput
                  name="website"
                  label="Website"
                  control={control}
                  isRequired={true}
                  leftIcon={<LinkSimple />}
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
