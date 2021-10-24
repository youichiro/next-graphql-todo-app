import { Logout } from '@mui/icons-material';
import { Avatar, IconButton, Tooltip, Menu, MenuItem, Button, ListItemIcon } from '@mui/material';
import { signOut } from 'next-auth/client';
import * as React from 'react';
import { useContext } from 'react';
import { SessionContext } from '../pages';

const Account: React.FC = () => {
  const { session } = useContext(SessionContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
