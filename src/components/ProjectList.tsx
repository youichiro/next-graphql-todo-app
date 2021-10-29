import { gql, useMutation, useQuery } from '@apollo/client';
import { List } from '@chakra-ui/react';
import { useContext } from 'react';
import { SessionContext } from '../pages';
import ProjectListItem from './ProjectListItem';
import { Project } from '.prisma/client';

const ProjectsQuery = gql`
  query Projects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
    selectedProject(userId: $userId) {
      project {
        id
      }
    }
  }
`;

const UPSERT_SELECTED_PROJECT = gql`
  mutation UpsertSelectedPorject($userId: Int!, $projectId: Int!) {
    upsertSelectedProject(userId: $userId, projectId: $projectId) {
      id
    }
  }
`;

const ProjectList: React.FC = () => {
  const { session } = useContext(SessionContext);
  const query = useQuery(ProjectsQuery, {
    variables: { userId: session.userId },
  });
  const [upsertSelectedProject, mutation] = useMutation(UPSERT_SELECTED_PROJECT, {
    refetchQueries: [ProjectsQuery],
  });

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Loading error! {query.error.message}</p>;

  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  const handleClick = (projectId: number) => {
    upsertSelectedProject({ variables: { userId: session.userId, projectId: projectId } });
  };

  return (
    <List>
      {query.data.projects.map((project: Project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          selectedProjectId={query.data.selectedProject?.project.id}
          handleClick={handleClick}
        />
      ))}
    </List>
  );
};

export default ProjectList;
