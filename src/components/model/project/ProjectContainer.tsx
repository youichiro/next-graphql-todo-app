import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { sortProjects } from '../../../utils/projects';
import { ProjectsQuery, ProjectsQueryData, ProjectsQueryVars } from '../../../graphql/queries';
import Loading from '../../functional/Loading';
import { SessionContext } from '../../page/Top';
import ProjectCreateButton from './ProjectCreateButton';
import ProjectList from './ProjectList';

const ProjectContainer: React.FC = () => {
  const { session } = useContext(SessionContext);
  const query = useQuery<ProjectsQueryData, ProjectsQueryVars>(ProjectsQuery, {
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
