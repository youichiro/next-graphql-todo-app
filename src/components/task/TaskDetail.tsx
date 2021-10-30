import { Box, Input, Textarea, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Task } from '.prisma/client';

type Props = {
  selectedTask: Task;
  handleTaskUpdateChange: (task: Task) => void;
};

const TaskDetail: React.FC<Props> = ({ selectedTask, handleTaskUpdateChange }) => {
  const [title, setTitle] = useState<string>(selectedTask?.title || '');
  const [description, setDescription] = useState<string>(selectedTask?.title || '');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const handleTaskTitleChange = (title: string) => {
    const task = {
      ...selectedTask,
      title: title || '',
    };
    handleTaskUpdateChange(task);
  };

  const handleTaskDescriptionChange = (description: string) => {
    const task = {
      ...selectedTask,
      description: description || '',
    };
    handleTaskUpdateChange(task);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
    handleTaskTitleChange(title);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setDescription(description);
    handleTaskDescriptionChange(description);
  };

  if (!selectedTask) return <p>Select your task.</p>;

  return (
    <Stack spacing='16px' h='100%'>
      <Box>
        <Input
          name='title'
          variant='flushed'
          value={title}
          onChange={handleTitleChange}
          placeholder='untitled'
          px='16px'
        />
      </Box>
      <Box flex='1'>
        <Textarea
          name='description'
          value={description}
          onChange={handleDescriptionChange}
          placeholder='Description'
          h='100%'
          borderColor='white'
          _focus={{ boxShadow: 'none', border: 'none'}}
          _hover={{ border: 'none' }}
          border='none'
        />
      </Box>
    </Stack>
  );
};

export default TaskDetail;
