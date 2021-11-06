import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { sortProjects } from '../../functional/projects';
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

  if (query.loading) return <Loading />;
  if (query.error) return <p>Loading error! {query.error.message}</p>;

  const projects = sortProjects(query.data.projects);

  return (
    <Stack spacing='32px'>
      <ProjectList
        projects={projects}
        selectedProject={query.data.selectedProject}
        userId={session.userId}
      />
      <ProjectCreateButton userId={session.userId} />
    </Stack>
  );
};

export default ProjectContainer;
