import { Box, Text, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Task } from '.prisma/client';

type Props = {
  selectedTask: Task;
  handleTaskUpdateChange: (task: Task) => void;
};

const TaskDetail: React.FC<Props> = ({ selectedTask, handleTaskUpdateChange }) => {
  const [value, setValue] = useState<string>(selectedTask?.title || '');

  useEffect(() => {
    if (selectedTask) {
      setValue(selectedTask.title);
    }
  }, [selectedTask]);

  const handleTaskTitleUpdateChange = (title: string) => {
    const task = {
      ...selectedTask,
      title: title,
    };
    handleTaskUpdateChange(task);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue(title);
    handleTaskTitleUpdateChange(title);
  };

  if (!selectedTask) return <p>Select your task.</p>;

  return (
    <Box>
      <Box mx='16px' my='32px'>
        <Input
          variant='flushed'
          value={value}
          onChange={handleChange}
          placeholder={!value ? 'untitled' : ''}
        />
      </Box>
      <Text m='16px' color='gray.600'>
        {selectedTask.description}
      </Text>
    </Box>
  );
};

export default TaskDetail;
