import { useMutation, useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { sortProjects } from '../../functional/projects';
import {
  DeleteProject,
  DeleteSelectedProject,
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
  const [deleteProject, mutation4] = useMutation(DeleteProject, {
    refetchQueries: [ProjectsQuery],
  });
  const [deleteSelectedProject, mutation5] = useMutation(DeleteSelectedProject, {
    refetchQueries: [ProjectsQuery],
  });

  if (query.loading) return <Loading />;
  if (query.error) return <p>Loading error! {query.error.message}</p>;

  if (mutation4.error) return <p>{mutation4.error.message}</p>;
  if (mutation5.error) return <p>{mutation5.error.message}</p>;

  const projects = sortProjects(query.data.projects);

  const handleDeleteProject = (id: number) => {
    if (query.data.selectedProject) {
      deleteSelectedProject({ variables: { id: query.data.selectedProject.id } });
    }
    deleteProject({ variables: { id: id } });
  };

  return (
    <Stack spacing='32px'>
      <ProjectList
        projects={projects}
        selectedProjectId={query.data.selectedProject?.project.id}
        userId={session.userId}
        handleDeleteProject={handleDeleteProject}
      />
      <ProjectCreateButton userId={session.userId} />
    </Stack>
  );
};

export default ProjectContainer;
