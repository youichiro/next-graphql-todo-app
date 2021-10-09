import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { useReactiveVar } from '@apollo/client';
import { sessionCache } from '../lib/cache';
import { Avatar, IconButton, Tooltip, Menu, MenuItem, Button, ListItemIcon } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';

const Account: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
  const session = useReactiveVar(sessionCache);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!session) {
    return (
      <div>
        <Avatar>
          <Person />
        </Avatar>
        <Link href='/api/auth/signin'>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    return (
      <div>
        <Tooltip title='account menu'>
          <IconButton onClick={handleClick}>
            <Avatar alt='avatar' src={session.user.image} sx={{ width: 64, height: 64 }} />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <Button variant='text' onClick={() => signOut()}>
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </div>
    );
  }
};

export default Account;
