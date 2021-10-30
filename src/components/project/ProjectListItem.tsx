import { Input, ListItem, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Project } from '.prisma/client';

type Props = {
  project: Project;
  selectedProjectId: number | null;
  handleUpsertSelectedProject: (projectId: number) => void;
  handleUpdateProject: (id: number, name: string) => void;
};

const ProjectListItem: React.FC<Props> = ({
  project,
  selectedProjectId,
  handleUpsertSelectedProject,
  handleUpdateProject,
}) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(project.name);
  const isSelected = project.id === selectedProjectId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setName(name);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    handleUpdateProject(project.id, name);
    setName(name);
    setEditable(false);
  };

  return (
    <ListItem
      key={project.id}
      px='16px'
      py='8px'
      bg={isSelected ? 'gray.300' : ''}
      onClick={() => handleUpsertSelectedProject(project.id)}
      onDoubleClick={() => setEditable(true)}
    >
      {editable ? (
        <Input
          name='name'
          variant='flushed'
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Project name'
        />
      ) : (
        <Box>{project.name}</Box>
      )}
    </ListItem>
  );
};

export default ProjectListItem;
