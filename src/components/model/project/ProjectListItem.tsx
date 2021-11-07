import { useMutation } from '@apollo/client';
import { ListItem, Box, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { UpsertSelectedProject } from '../../../graphql/mutations';
import { ProjectsQuery, SelectedProjectQuery } from '../../../graphql/queries';
import ProjectDeleteButton from './ProjectDeleteButton';
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

  const [upsertSelectedProject, mutation] = useMutation(UpsertSelectedProject, {
    refetchQueries: [ProjectsQuery],
  });

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    upsertSelectedProject({ variables: { userId: userId, projectId: project.id } });
  };

  if (mutation.error) return <p>{mutation.error.message}</p>;

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
          <ProjectDeleteButton projectId={project.id} />
        </Stack>
      ) : (
        <Box>{project.name}</Box>
      )}
    </ListItem>
  );
};

export default ProjectListItem;
