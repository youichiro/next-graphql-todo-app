import { List, Box } from '@chakra-ui/react';
import ProjectListItem from './ProjectListItem';
import { Project } from '.prisma/client';


type Props = {
  projects: Project[]
  selectedProjectId?: number
  handleClick: (projectId: number) => void
}

const ProjectList: React.FC<Props> = ({ projects, selectedProjectId, handleClick }) => {
  return (
    <Box>
      <List>
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            selectedProjectId={selectedProjectId}
            handleClick={handleClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default ProjectList;
