import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSearch: Dispatch<SetStateAction<string>>;
}

const FilterModal = ({ isOpen, onClose, setSearch }: FilterModalProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleFilter = () => {
    setSearch(searchValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
      <ModalOverlay />
      <ModalContent>
        {/* Modal Content */}
        <ModalHeader>Filter Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Search</FormLabel>
            <Input
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleFilter} colorScheme="primary">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
