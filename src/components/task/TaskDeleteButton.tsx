import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

type Props = {
  handleTaskDelete: () => void;
};

const TaskDeleteButton: React.FC<Props> = ({ handleTaskDelete }) => {
  const handleClick = () => {
    const check = window.confirm('Delete this task?')
    if (check) {
      handleTaskDelete()
    }
  }
  return (
    <Box mx='16px' mt='8px'>
      <IconButton
        aria-label='task delete button'
        icon={<DeleteIcon />}
        color='gray'
        _hover={{ color: 'red' }}
        bg='none'
        onClick={() => handleClick()}
      />
    </Box>
  );
};

export default TaskDeleteButton;
