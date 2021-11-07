import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { Task } from '@prisma/client';
import { DeleteTask } from '../../../graphql/mutations';
import { SelectedProjectQuery } from '../../../graphql/queries';

type Props = {
  taskId: number | null;
  setSelectedTask: (task: Task) => void;
};

const TaskDeleteButton: React.FC<Props> = ({ taskId, setSelectedTask }) => {
  const [deleteTask, mutation] = useMutation(DeleteTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  const handleClick = () => {
    const check = window.confirm('Delete this task?');
    if (check) {
      deleteTask({ variables: { id: taskId } });
      setSelectedTask(null);
    }
  };

  if (!taskId) return <></>
  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

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
