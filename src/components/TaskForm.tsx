import { Box, Input, FormControl } from "@chakra-ui/react";

const TaskForm: React.FC = () => {
  return (
    <Box p='16px'>
      <FormControl id="task">
        <Input type='text' placeholder="Add task" />
      </FormControl>
    </Box>
  );
};
export default TaskForm;
