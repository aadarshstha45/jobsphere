import { useLoginUser } from "@/api/auth";
import LoginBanner from "@/assets/images/login.png";
import { TextInput } from "@/components/Form/Input";
import {
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight, At, Briefcase, Lock } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues,
    // resolver: yupResolver(LoginSchema),
  });

  const { mutateAsync, isPending } = useLoginUser();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const response = await mutateAsync(data);
    if (response.status === 200) {
      navigate("/", { replace: true });
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} minH={window.innerHeight}>
      <GridItem h={"full"} w={"full"} colSpan={1}>
        <HStack as={Link} to={"/"} p={10}>
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
          <Flex
            h={window.innerHeight - 400}
            flexDir={"column"}
            justify={"center"}
            gap={4}
          >
            <Stack gap={0}>
              <Text fontWeight={500} fontSize={{ base: "xl", md: "3xl" }}>
                Sign In
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Welcome back! Please sign in to your account.
              </Text>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack gap={0}>
                <TextInput
                  control={control}
                  label={"Email"}
                  name={"email"}
                  leftIcon={<At />}
                  isRequired
                />
                <TextInput
                  type="password"
                  control={control}
                  label={"Password"}
                  name={"password"}
                  leftIcon={<Lock />}
                  isRequired
                />
                <Button
                  rightIcon={<ArrowRight />}
                  type={"submit"}
                  w={"full"}
                  mt={2}
                  colorScheme={"primary"}
                  isLoading={isPending}
                >
                  Sign In
                </Button>
              </Stack>
            </form>
            <Flex justify={"center"} mt={4}>
              <Text fontSize={"sm"}>Don't have an account?</Text>
              <ChakraLink as={Link} to={"/register"}>
                <Text color={"primary.500"} ml={1} fontSize={"sm"}>
                  Sign Up Here
                </Text>
              </ChakraLink>
            </Flex>
          </Flex>
        </Container>
      </GridItem>
      <GridItem
        display={{ base: "none", md: "block" }}
        h={"full"}
        w={"full"}
        colSpan={1}
        bg={`url(${LoginBanner})`}
      >
        {/* <Image
          h={"full"}
          w={"full"}
          objectFit={"cover"}
          objectPosition={"left"}
          src={LoginBanner}
          alt={"Login Banner"}
        /> */}
      </GridItem>
    </SimpleGrid>
  );
};

export default Login;
