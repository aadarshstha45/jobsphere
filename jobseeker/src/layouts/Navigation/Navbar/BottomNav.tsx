import { useLogoutUser } from "@/api/auth";
import { RootInterface } from "@/api/auth/response";
import { BaseURL } from "@/api/axiosSetup";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  Bell,
  Briefcase,
  MagnifyingGlass,
  SignOut,
} from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { profileMenuItems } from "./data";

type BottomNavProps = {
  isAuthenticated: boolean;
  user?: RootInterface | undefined;
};

const BottomNav = ({ isAuthenticated, user }: BottomNavProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const avatar = user?.data.jobseeker.profilePicture
    ? `${BaseURL}/${user.data.jobseeker.profilePicture}`
    : "";
  const navigate = useNavigate();
  const logout = useLogoutUser();

  const onSearch = (data: any) => {
    navigate(`/find-job?search=${data.search}`);
  };

  const handleLogout = async () => {
    const response = await logout.mutateAsync();
    if (response.status === 200) {
      navigate("/", { replace: true });
    }
    window.location.reload();
  };

  return (
    <Box borderBottom={"1px solid "} borderColor={"gray.50"} shadow={"xs"}>
      <Container
        maxW={{ base: "100vw", sm: "95vw", md: "90vw", lg: "80vw", xl: "75vw" }}
        px={0}
      >
        <Flex justify={"space-between"} align={"center"} p={4}>
          <HStack>
            <Icon as={Briefcase} boxSize={8} />
            <Text fontSize={"lg"}>JobSphere</Text>
          </HStack>
          <Controller
            name="search"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputGroup
                display={{ base: "none", md: "flex" }}
                w={{ md: "500px" }}
              >
                <InputLeftElement pointerEvents="none" alignItems={"center"}>
                  <Icon
                    as={MagnifyingGlass}
                    boxSize={6}
                    mt={0.5}
                    _groupFocus={{ textColor: "black" }}
                  />
                </InputLeftElement>
                <Input
                  value={value}
                  onChange={onChange}
                  focusBorderColor="primary.500"
                  borderColor={"gray.100"}
                  borderRadius={5}
                  fontSize={{ base: "16px", md: "16px", xl: "18px" }}
                  placeholder={"Search for jobs"}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(onSearch)();
                    }
                  }}
                />
              </InputGroup>
            )}
          />
          <HStack gap={4} align={"center"}>
            {!isAuthenticated ? (
              <Button as={Link} to={"/login"} size={"sm"} colorScheme="primary">
                Log In
              </Button>
            ) : (
              <>
                <Icon as={Bell} boxSize={6} />

                <Menu placement="bottom-end">
                  <MenuButton>
                    <Avatar
                      display={{ base: "none", md: "flex" }}
                      cursor={"pointer"}
                      src={avatar}
                      size={"sm"}
                      loading="lazy"
                    />
                  </MenuButton>
                  <MenuList
                    zIndex={9999}
                    minW={"fit-content"}
                    maxW={"fit-content"}
                    borderColor={"primary.500"}
                    overflow={"hidden"}
                    p={2}
                  >
                    {profileMenuItems.map((item, index) => (
                      <MenuItem
                        as={NavLink}
                        key={index}
                        to={item.to}
                        borderRadius={5}
                        _hover={{ bg: "primary.500", color: "white" }}
                        icon={<Icon as={item.icon} boxSize={4} />}
                        fontSize={{ base: "12px", md: "14px" }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                    <MenuDivider borderColor={"gray"} />
                    <MenuItem
                      _hover={{ bg: "primary.500", color: "white" }}
                      borderRadius={5}
                      icon={
                        <Icon
                          transform={"rotate(180deg)"}
                          as={SignOut}
                          boxSize={4}
                        />
                      }
                      fontSize={{ base: "12px", md: "14px" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomNav;
