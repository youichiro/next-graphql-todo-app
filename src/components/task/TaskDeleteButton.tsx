import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

type Props = {
  handleClick: () => void
}

const TaskDeleteButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <Box mx='16px' my='8px'>
      <IconButton
        aria-label='task delete button'
        icon={<DeleteIcon />}
        color='gray'
        _hover={{ color: 'red' }}
        bg='none'
        onClick={handleClick}
      />
    </Box>
  );
};

export default TaskDeleteButton;
