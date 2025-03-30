import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Avatar, Box, ListItemIcon, ListItemText } from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Add, Logout, Person } from '@mui/icons-material';

export default function UserMenu() {
  const {currentUser, logoutUser} = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color='inherit'
        size='large'
        sx={{fontSize:'1.1rem'}}
      >
        <Box display={'flex'} alignItems={'center'} gap={2}>
            <Avatar
              src={currentUser?.imageUrl}
              alt="Current user Image"
            />
            {currentUser?.displayName}
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}
            component={Link} to='/createProject'>
                <ListItemIcon>
                    <Add/>
                </ListItemIcon>
                <ListItemText>
                    Create Project
                </ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleClose}
            component={Link} to={`/profiles/${currentUser?.id}`}>
                <ListItemIcon>
                    <Person/>
                </ListItemIcon>
                <ListItemText>
                    My profile
                </ListItemText>
        </MenuItem>
        
        <MenuItem onClick={()=>{
            logoutUser.mutate();
            handleClose();
        }}>
                <ListItemIcon>
                    <Logout/>
                </ListItemIcon>
                <ListItemText>
                    Logout
                </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
