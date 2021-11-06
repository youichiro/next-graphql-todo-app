import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { Input, ListItem, Box, Stack, IconButton, useRadio } from '@chakra-ui/react';
import React, { useState } from 'react';
import { UpsertSelectedProject } from '../../graphql/mutations';
import { ProjectsQuery } from '../../graphql/queries';
import { Project } from '.prisma/client';

type Props = {
  project: Project;
  selectedProjectId: number | null;
  userId: number;
  handleUpdateProject: (id: number, name: string) => void;
  handleDeleteProject: (id: number) => void;
};

const ProjectListItem: React.FC<Props> = ({
  project,
  selectedProjectId,
  userId,
  handleUpdateProject,
  handleDeleteProject,
}) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(project.name);
  const isSelected = project.id === selectedProjectId;

  const [upsertSelectedProject, mutation1] = useMutation(UpsertSelectedProject, {
    refetchQueries: [ProjectsQuery],
  });

  const handleUpsertSelectedProject = () => {
    upsertSelectedProject({ variables: { userId: userId, projectId: project.id}})
  }

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
    e.stopPropagation();
    const check = window.confirm('Delete this project');
    if (check) {
      handleDeleteProject(project.id);
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    handleUpsertSelectedProject();
  };

  if (mutation1.error) return <p>{mutation1.error.message}</p>;

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
