import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { ListItem, Box, Stack, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeleteProject, UpsertSelectedProject } from '../../graphql/mutations';
import { ProjectsQuery, SelectedProjectQuery } from '../../graphql/queries';
import ProjectNameForm from './ProjectNameForm';

type Props = {
  project: ProjectsQuery;
  selectedProject: SelectedProjectQuery;
  userId: number;
};

const ProjectListItem: React.FC<Props> = ({ project, selectedProject, userId }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(project.name);
  const isSelected = project.id === selectedProject?.project.id;

  const [upsertSelectedProject, mutation1] = useMutation(UpsertSelectedProject, {
    refetchQueries: [ProjectsQuery],
  });
  const [deleteProject, mutation3] = useMutation(DeleteProject, {
    refetchQueries: [ProjectsQuery],
  });

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const check = window.confirm('Delete this project');
    if (check) {
      deleteProject({ variables: { id: project.id } });
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    upsertSelectedProject({ variables: { userId: userId, projectId: project.id } });
  };

  if (mutation1.error) return <p>{mutation1.error.message}</p>;
  if (mutation3.error) return <p>{mutation3.error.message}</p>;

  return (
    <ListItem
      key={project.id}
      px='16px'
      py='8px'
      bg={isSelected ? 'gray.300' : ''}
      onClick={handleItemClick}
      onDoubleClick={() => setEditable(true)}
    >
      {editable && isSelected ? (
        <Stack direction='row' align='center'>
          <ProjectNameForm
            userId={userId}
            projectId={project.id}
            name={name}
            setName={setName}
            setEditable={setEditable}
          />
          <IconButton
            aria-label='delete project button'
            icon={<DeleteIcon />}
            size='xs'
            bg='none'
            _hover={{ color: 'red' }}
            _focus={{ boxShadow: 'none' }}
            onClick={handleDeleteButtonClick}
          />
        </Stack>
      ) : (
        <Box>{project.name}</Box>
      )}
    </ListItem>
  );
};

export default ProjectListItem;
