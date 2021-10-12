import { gql, useQuery } from '@apollo/client';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSession } from 'next-auth/client';
import { selectedProjectIdCache } from '../lib/cache';
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
    variables: { userId: session.userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;

  const handleClick = (projectId) => {
    selectedProjectIdCache(projectId);
  };

  return (
    <List sx={{ borderTop: 1, borderBottom: 1 }}>
      {data.projects.map((project: Project) => (
        <ListItem key={project.id} disablePadding onClick={() => handleClick(project.id)}>
          <ListItemButton>
            <ListItemText primary={project.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProjectList;
