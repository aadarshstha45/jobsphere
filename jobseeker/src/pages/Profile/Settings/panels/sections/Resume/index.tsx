import { useDeleteResume, useFetchResume } from "@/api/function/resume";
import { DeleteAlert } from "@/components/Form/Modal";
import {
  Button,
  Flex,
  GridItem,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DotsThreeOutline,
  FileText,
  PencilSimpleLine,
  PlusCircle,
  Trash,
} from "@phosphor-icons/react";
import { useState } from "react";
import ResumeModal from "./ResumeModal";

const Resume = () => {
  const [id, setId] = useState<string | null>(null);

  const { data: resumes } = useFetchResume();

  const { mutateAsync: deleteResume, isPending: deleteIsPending } =
    useDeleteResume();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleResumeDelete = async () => {
    if (id) {
      const response = await deleteResume(id);
      if (response.data.status === 1) {
        setId(null);
        onDeleteClose();
      }
    }
  };

  const handleEditOpen = (id: string) => {
    setId(id);
    onOpen();
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Resume / CVs
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {resumes &&
          resumes?.data.count > 0 &&
          resumes.data.rows.map((resume) => (
            <GridItem colSpan={1} key={resume.id}>
              <Flex
                p={4}
                border={"1px solid"}
                borderColor={"gray.100"}
                bg={"gray.50"}
                borderRadius={6}
                h={"full"}
                align={"center"}
                gap={4}
                justify={"space-between"}
              >
                <HStack>
                  <Icon as={FileText} boxSize={8} color={"primary.500"} />
                  <Stack gap={0}>
                    <Text noOfLines={1} fontWeight={500}>
                      {resume.title}
                    </Text>
                  </Stack>
                </HStack>
                <Menu placement="bottom-end">
                  <Button as={MenuButton} size={"sm"} p={0} variant={"ghost"}>
                    <Icon as={DotsThreeOutline} boxSize={6} />
                  </Button>
                  <MenuList minW={"fit-content"} maxW={"max-content"} px={2}>
                    <MenuItem
                      _hover={{
                        bg: "primary.100",
                      }}
                      borderRadius={5}
                      icon={
                        <Icon
                          color={"primary.500"}
                          as={PencilSimpleLine}
                          boxSize={4}
                        />
                      }
                      onClick={() => {
                        handleEditOpen(resume.id.toString());
                      }}
                    >
                      <Text
                        fontSize={14}
                        fontWeight={500}
                        color={"primary.500"}
                      >
                        Edit
                      </Text>
                    </MenuItem>
                    <MenuItem
                      _hover={{
                        bg: "red.100",
                      }}
                      borderRadius={5}
                      icon={<Icon color={"red.500"} as={Trash} boxSize={4} />}
                      onClick={() => {
                        setId(resume.id.toString());
                        onDeleteOpen();
                      }}
                    >
                      <Text fontSize={14} fontWeight={500} color={"red.500"}>
                        Delete
                      </Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </GridItem>
          ))}

        <DeleteAlert
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          heading="Delete Resume"
          onDelete={handleResumeDelete}
          isDeleting={deleteIsPending}
          message="Are you sure you want to delete this resume?"
        />

        {resumes && resumes?.data.count < 5 && (
          <GridItem colSpan={1}>
            <Flex
              h={"full"}
              cursor={"pointer"}
              onClick={onOpen}
              p={4}
              border={"2px dashed"}
              borderColor={"gray.100"}
              borderRadius={6}
              align={"center"}
              gap={4}
            >
              <Icon as={PlusCircle} boxSize={8} color={"primary.500"} />
              <Stack gap={0}>
                <Text noOfLines={1} fontWeight={500}>
                  Add New Resume
                </Text>
              </Stack>
            </Flex>
          </GridItem>
        )}
      </SimpleGrid>
      <ResumeModal isOpen={isOpen} onClose={onClose} id={id} setId={setId} />
    </Flex>
  );
};

export default Resume;
