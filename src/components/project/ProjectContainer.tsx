import { useMutation, useQuery } from '@apollo/client';
import { Box, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { sortProjects } from '../../functional/projects';
import {
  CreateProject,
  DeleteProject,
  UpdateProject,
  UpsertSelectedProject,
} from '../../graphql/mutations';
import { ProjectsQuery } from '../../graphql/queries';
import { SessionContext } from '../../pages';
import Loading from '../common/Loading';
import ProjectCreateButton from './ProjectCreateButton';
import ProjectList from './ProjectList';

const ProjectContainer: React.FC = () => {
  const { session } = useContext(SessionContext);
  const query = useQuery(ProjectsQuery, {
    variables: { userId: session.userId },
  });
  const [upsertSelectedProject, mutation1] = useMutation(UpsertSelectedProject, {
    refetchQueries: [ProjectsQuery],
  });
  const [createProject, mutation2] = useMutation(CreateProject, {
    refetchQueries: [ProjectsQuery],
  });
  const [updateProject, mutation3] = useMutation(UpdateProject, {
    refetchQueries: [ProjectsQuery],
  });
  const [deleteProject, mutation4] = useMutation(DeleteProject, {
    refetchQueries: [ProjectsQuery],
  });

  if (query.loading) return <Loading />;
  if (query.error) return <p>Loading error! {query.error.message}</p>;

  if (mutation1.error) return <p>{mutation1.error.message}</p>;
  if (mutation2.error) return <p>{mutation2.error.message}</p>;
  if (mutation3.error) return <p>{mutation3.error.message}</p>;
  if (mutation4.error) return <p>{mutation4.error.message}</p>;

  const handleUpsertSelectedProject = (projectId: number) => {
    upsertSelectedProject({ variables: { userId: session.userId, projectId: projectId } });
  };

  const handleCreateProject = () => {
    createProject({ variables: { userId: session.userId, name: 'new project' } });
  };

  const handleUpdateProject = (id: number, name: string) => {
    updateProject({ variables: { id: id, name: name } });
  };

  const handleDeleteProject = (id: number) => {
    deleteProject({ variables: { id: id } });
  };

  const projects = sortProjects(query.data.projects);

  return (
    <Stack spacing='32px'>
      <ProjectList
        projects={projects}
        selectedProjectId={query.data.selectedProject?.project.id}
        handleUpsertSelectedProject={handleUpsertSelectedProject}
        handleUpdateProject={handleUpdateProject}
      />
      <ProjectCreateButton handleCreateProject={handleCreateProject} />
    </Stack>
  );
};

export default ProjectContainer;
