import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import {
  DotsThreeOutlineVertical,
  Eye,
  Pencil,
  Trash,
} from "@phosphor-icons/react";

interface ActionColumnProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
}

const ActionColumn = ({
  onView,
  onEdit,
  onDelete,
  viewLabel,
  editLabel,
  deleteLabel,
}: ActionColumnProps) => {
  return (
    <Menu colorScheme="primary" placement="bottom-end">
      <Button
        as={MenuButton}
        bg={"transparent"}
        colorScheme="gray"
        _hover={{ bg: "gray.200" }}
        size={"sm"}
      >
        <Icon aria-label="Options" as={DotsThreeOutlineVertical} boxSize={5} />
      </Button>
      <Portal>
        <MenuList
          bg={"white"}
          px={2}
          border={"1px solid"}
          borderColor={"gray.200"}
          minW={"fit-content"}
          zIndex={4}
        >
          <MenuItem
            aria-label="View"
            icon={<Icon as={Eye} boxSize={4} />}
            onClick={onView}
            py={1}
            px={2}
            _hover={{ bg: "teal.400", textColor: "gray.50", borderRadius: 5 }}
          >
            {viewLabel ?? "View"}
          </MenuItem>
          <MenuItem
            aria-label="Edit"
            py={1}
            px={2}
            icon={<Icon as={Pencil} boxSize={4} />}
            onClick={onEdit}
            _hover={{
              bg: "primary.400",
              textColor: "gray.50",
              borderRadius: 5,
            }}
          >
            {editLabel ?? "Edit"}
          </MenuItem>
          <MenuItem
            aria-label="Delete"
            icon={<Icon as={Trash} boxSize={4} />}
            onClick={onDelete}
            py={1}
            px={2}
            _hover={{ bg: "red.400", textColor: "gray.50", borderRadius: 5 }}
          >
            {deleteLabel ?? " Delete"}
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default ActionColumn;
