import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { AppBar, Box, Container, MenuItem, MenuList, Toolbar, Typography } from "@mui/material";
import { NavLink } from 'react-router';
import MenuItemLink from './shared/components/MenuItemLink';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #00E487 0%, #66EFB7 69%, #1432FF 89% )' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <EmojiObjectsIcon fontSize='large'/>
                <Typography variant="h4" fontWeight='bold'>Program Manager</Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuList>
                <MenuItemLink to='/projects'>
                  Projects
                </MenuItemLink>
                <MenuItemLink to='/program' >
                  Program
                </MenuItemLink>

              </MenuList>

              <MenuList>
                <MenuItemLink to='/createProject' >
                  Create Project
                </MenuItemLink>
                <MenuItemLink to='/milestones' >
                  Milestones
                </MenuItemLink>
              </MenuList>

              <MenuItemLink to='/launchCalendar' >
                Launch Calendar
              </MenuItemLink>
            </Box>
              <MenuItem>User Menu</MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
