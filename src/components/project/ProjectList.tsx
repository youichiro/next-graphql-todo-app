import { List, Box, Text } from '@chakra-ui/react';
import ProjectListItem from './ProjectListItem';
import { Project } from '.prisma/client';

type Props = {
  projects: Project[];
  selectedProjectId?: number;
  handleClick: (projectId: number) => void;
};

const ProjectList: React.FC<Props> = ({ projects, selectedProjectId, handleClick }) => {
  if (projects.length === 0) {
    return (
      <Box>
        <Text color='gray'>Select project.</Text>
      </Box>
    );
  }
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
