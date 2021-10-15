import { gql, useMutation, useQuery } from '@apollo/client';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSession } from 'next-auth/client';
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
  const [session, _] = useSession();
  const query = useQuery(ProjectsQuery, {
    variables: { userId: session.userId },
  });
  const [upsertSelectedProject, mutation] = useMutation(UPSERT_SELECTED_PROJECT, {
    refetchQueries: [
      ProjectsQuery,
    ]
  });

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Loading error! {query.error.message}</p>;

  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  const handleClick = (projectId: number) => {
    upsertSelectedProject({ variables: { userId: session.userId, projectId: projectId } });
  };

  return (
    <List sx={{ borderTop: 1, borderBottom: 1 }}>
      {query.data.projects.map((project: Project) => (
        <ListItem key={project.id} disablePadding onClick={() => handleClick(project.id)} selected={project.id === query.data.selectedProject.project.id}>
          <ListItemButton>
            <ListItemText primary={project.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProjectList;
