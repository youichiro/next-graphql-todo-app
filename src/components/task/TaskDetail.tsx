import { Box, Heading, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';

const TaskDetail: React.FC = () => {
  const { selectedTask } = useContext(TaskContext);

  if (!selectedTask) return <p>Select your task.</p>;

  return (
    <Box>
      <Heading size='md' mx='16px' my='32px'>{selectedTask.title}</Heading>
      <Text m='16px' color='gray.600'>{selectedTask.description}</Text>
    </Box>
  );
};

export default TaskDetail;
