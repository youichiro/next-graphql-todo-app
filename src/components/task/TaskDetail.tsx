import { Box, Editable, EditableInput, EditablePreview, Heading, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';
import { Task } from '.prisma/client';

type Props = {
  handleChange: (task: Task) => void
}

const TaskDetail: React.FC<Props> = ({ handleChange }) => {
  const { selectedTask } = useContext(TaskContext);

  const handleTaskTitleChange = (title: string) => {
    const task: Task = {
      ...selectedTask,
      title: title
    }
    handleChange(task)
  }

  if (!selectedTask) return <p>Select your task.</p>;

  return (
    <Box>
      <Editable
        defaultValue={selectedTask.title}
        onChange={(value) => handleTaskTitleChange(value)}
      >
        <Heading size='md' mx='16px' my='32px'>
          <EditablePreview />
          <EditableInput />
        </Heading>
      </Editable>
      <Text m='16px' color='gray.600'>
        {selectedTask.description}
      </Text>
    </Box>
  );
};

export default TaskDetail;
