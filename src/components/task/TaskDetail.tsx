import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';

const TaskDetail: React.FC = () => {
  const { selectedTaskId } = useContext(TaskContext);
  return (
    <Box>
      {selectedTaskId}
    </Box>
  );
};

export default TaskDetail;
