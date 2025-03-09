import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { AppBar, Box, Container, LinearProgress, MenuItem, MenuList, Toolbar, Typography } from "@mui/material";
import { NavLink } from 'react-router';
import MenuItemLink from './shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';

export default function NavBar() {
  const {uiStore} = useStore();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
          sx={{ backgroundImage: 'linear-gradient(135deg, #00E478 0%, #66EFB7 69%, #1432FF 89% )', 
            position: 'relative'
          }}>
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

              <MenuItemLink to='/counter' >
                Counter
              </MenuItemLink>

              <MenuItemLink to='/errors' >
                Errors
              </MenuItemLink>

            </Box>
              <MenuItem>User Menu</MenuItem>
          </Toolbar>
        </Container>

        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress
              color='secondary'
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4
              }}
            />
          ) : null}
        </Observer>


      </AppBar>
    </Box>
  )
}
