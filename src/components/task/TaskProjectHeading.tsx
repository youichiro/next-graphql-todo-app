import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react';

type Props = {
  projectName: string;
};

const TaskProjectHeading: React.FC<Props> = ({ projectName }) => {
  return (
    <Stack direction='row' justifyContent='space-between' align='center'>
      <Heading size='md'>{projectName}</Heading>
      <Menu autoSelect={false}>
        <MenuButton>
          <IconButton
            aria-label='project options button'
            icon={<SettingsIcon />}
            bg='none'
            color='gray'
          />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<DeleteIcon />}>Delete this project</MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default TaskProjectHeading;
