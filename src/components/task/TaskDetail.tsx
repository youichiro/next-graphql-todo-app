import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';

const TaskDetail: React.FC = () => {
  const { selectedTask } = useContext(TaskContext);

  if (!selectedTask) return <p>Select your task.</p>

  return (
    <Box>
      {selectedTask.title}
      {selectedTask.description}
    </Box>
  );
};

export default TaskDetail;
