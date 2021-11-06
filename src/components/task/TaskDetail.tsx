import { useMutation } from '@apollo/client';
import { Box, Input, Textarea, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UpdateTask } from '../../graphql/mutations';
import { SelectedProjectQuery } from '../../graphql/queries';
import { Task } from '.prisma/client';

type Props = {
  selectedTask: Task;
  setSelectedTask: (task: Task) => void;
};

const TaskDetail: React.FC<Props> = ({ selectedTask, setSelectedTask }) => {
  const [title, setTitle] = useState<string>(selectedTask?.title || '');
  const [description, setDescription] = useState<string>(selectedTask?.title || '');

  const [updateTask, mutation] = useMutation(UpdateTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const handleTaskUpdate = (task: Task) => {
    updateTask({
      variables: {
        id: task.id,
        title: task.title,
        description: task.description,
        done: task.done,
      },
    });
    setSelectedTask(task);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const task = {
      ...selectedTask,
      title: title || '',
    };
    setTitle(title);
    handleTaskUpdate(task);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    const task = {
      ...selectedTask,
      description: description || '',
    };
    setDescription(description);
    handleTaskUpdate(task);
  };

  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  if (!selectedTask)
    return (
      <Box>
        <Text color='gray'>Select task.</Text>
      </Box>
    );

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
          _focus={{ boxShadow: 'none', border: 'none' }}
          _hover={{ border: 'none' }}
          border='none'
        />
      </Box>
    </Stack>
  );
};

export default TaskDetail;
