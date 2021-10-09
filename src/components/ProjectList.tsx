import { gql, useQuery } from "@apollo/client"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { Box } from "@mui/system"

const ProjectsQuery = gql`
  query Projects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
  }
`
const ProjectList: React.FC = () => {
  const { data, loading, error } = useQuery(ProjectsQuery, {
    variables: { userId: 1 },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error... {error.message}</p>

  return (
    <List sx={{ borderTop: 1, borderBottom: 1 }}>
      {data.projects.map(project => (
        <ListItem key={project.id} disablePadding>
          <ListItemButton>
            <ListItemText primary={project.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default ProjectList
