import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Box, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { signOut } from 'next-auth/client';
import * as React from 'react';
import { useContext } from 'react';
import { SessionContext } from '../pages';

const Account: React.FC = () => {
  const { session } = useContext(SessionContext);

  return (
    <Box>
      <Menu>
        <MenuButton as={Avatar}>
          <Avatar name='avatar' src={session.user.image} />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<AddIcon />} onClick={() => signOut()}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Account;
