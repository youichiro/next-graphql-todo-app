import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

type Props = {
  handleTaskDelete: () => void;
};

const TaskDeleteButton: React.FC<Props> = ({ handleTaskDelete }) => {
  return (
    <Box mx='16px' my='8px'>
      <IconButton
        aria-label='task delete button'
        icon={<DeleteIcon />}
        color='gray'
        _hover={{ color: 'red' }}
        bg='none'
      />
    </Box>
  );
};

export default TaskDeleteButton;
