import { Switch } from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";

interface StatusColumnProps {
  isActive: boolean;
  id: string;
  mutateFunction: UseMutationResult<
    any,
    Error,
    { id: string; data: { isActive: boolean } }
  >;
}

const StatusColumn = ({ isActive, id, mutateFunction }: StatusColumnProps) => {
  const handleChange = async () => {
    try {
      await mutateFunction.mutateAsync({
        id,
        data: {
          isActive: !isActive,
        },
      });
      // Handle success if needed
    } catch (error) {
      // Handle error if needed
      console.error("Error updating status:", error);
    }
  };

  return (
    <Switch
      isChecked={isActive}
      colorScheme="primary"
      onChange={handleChange}
    />
  );
};

export default StatusColumn;
