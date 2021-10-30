import { DeleteIcon } from '@chakra-ui/icons';
import { Input, ListItem, Box, Stack, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Project } from '.prisma/client';

type Props = {
  project: Project;
  selectedProjectId: number | null;
  handleUpsertSelectedProject: (projectId: number) => void;
  handleUpdateProject: (id: number, name: string) => void;
  handleDeleteProject: (id: number) => void;
};

const ProjectListItem: React.FC<Props> = ({
  project,
  selectedProjectId,
  handleUpsertSelectedProject,
  handleUpdateProject,
  handleDeleteProject,
}) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(project.name);
  const isSelected = project.id === selectedProjectId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    handleUpdateProject(project.id, name);
    setName(name);
    setEditable(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const check = window.confirm('Delete this project');
    if (check) {
      handleDeleteProject(project.id);
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    handleUpsertSelectedProject(project.id)
  }

  return (
    <ListItem
      key={project.id}
      px='16px'
      py='8px'
      bg={isSelected ? 'gray.300' : ''}
      onClick={handleItemClick}
      onDoubleClick={() => setEditable(true)}
    >
      {editable && project.id === selectedProjectId ? (
        <Stack direction='row' align='center'>
          <Input
            name='name'
            variant='flushed'
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Project name'
          />
          <IconButton
            aria-label='delete project button'
            icon={<DeleteIcon />}
            size='xs'
            bg='none'
            _hover={{ color: 'red' }}
            _focus={{ boxShadow: 'none' }}
            onClick={handleButtonClick}
          />
        </Stack>
      ) : (
        <Box>{project.name}</Box>
      )}
    </ListItem>
  );
};

export default ProjectListItem;
