import { Avatar, Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { signOut } from 'next-auth/client';
import * as React from 'react';
import { useContext } from 'react';
import { SessionContext } from '../pages';

const Account: React.FC = () => {
  const { session } = useContext(SessionContext);

  return (
    <Box p='16px'>
      <Menu>
        <MenuButton>
          <Avatar name='avatar' src={session.user.image} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Account;
