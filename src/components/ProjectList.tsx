import { gql, useQuery } from '@apollo/client';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSession } from 'next-auth/client';
import { Project } from '.prisma/client';

const ProjectsQuery = gql`
  query Projects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
  }
`;

const ProjectList: React.FC = () => {
  const [session, _] = useSession();
  const { data, loading, error } = useQuery(ProjectsQuery, {
    variables: { userId: session.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;

  return (
    <List sx={{ borderTop: 1, borderBottom: 1 }}>
      {data.projects.map((project: Project) => (
        <ListItem key={project.id} disablePadding>
          <ListItemButton>
            <ListItemText primary={project.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProjectList;
