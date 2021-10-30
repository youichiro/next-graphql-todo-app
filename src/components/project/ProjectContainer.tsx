import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { SessionContext } from '../../pages';
import ProjectList from './ProjectList';

const ProjectsQuery = gql`
  query Projects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
    selectedProject(userId: $userId) {
      project {
        id
        tasks {
          id
          title
        }
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

const ProjectContainer: React.FC = () => {
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
    <ProjectList
      projects={query.data.projects}
      selectedProjectId={query.data.selectedProject?.project.id}
      handleClick={handleClick}
    />
  );
};

export default ProjectContainer;
