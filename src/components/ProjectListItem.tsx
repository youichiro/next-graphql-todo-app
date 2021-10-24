import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Project } from '.prisma/client';

type Props = {
  project: Project;
  selectedProjectId: number | null;
  handleClick: (projectId: number) => void;
};

const ProjectListItem: React.FC<Props> = ({ project, selectedProjectId, handleClick }) => {
  return (
    <ListItem
      disablePadding
      onClick={() => handleClick(project.id)}
      selected={project.id === selectedProjectId}
    >
      <ListItemButton>
        <ListItemText primary={project.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default ProjectListItem;
