import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { AppBar, Box, CircularProgress, Container, MenuItem, MenuList, Toolbar, Typography } from "@mui/material";
import { NavLink } from 'react-router';
import MenuItemLink from './shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';
import FilterClustersHorizontal from '../../features/common/filters/FilterClustersHorizontal';

export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"
        sx={{
          backgroundImage: 'linear-gradient(135deg, #00E478 0%, #66EFB7 69%, #1432FF 89% )',

        }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <EmojiObjectsIcon fontSize='large' />
                <Typography sx={{position: 'relative'}} variant="h4" fontWeight='bold'>Program Manager</Typography>

                <Observer>
                  {() => uiStore.isLoading ? (
                    <CircularProgress
                    size={20}
                    thickness={7}  
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top:'30%',
                        left: '105%'
                      }}
                    />
                  ) : null}
                </Observer>

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

                <MenuItemLink to='/milestones' >
                  Milestones
                </MenuItemLink>

                <MenuItemLink to='/launchCalendar' >
                  Launch Calendar
                </MenuItemLink>

              </MenuList>

              <MenuList>

              <MenuItemLink to='/roadmap' >
                  Roadmap
                </MenuItemLink>



              </MenuList>




            </Box>

            <Box display={'flex'} alignItems={'center'}>
              {currentUser ? (
                <UserMenu />
              ) :
                <>
                  <MenuItemLink to='/login'>Login</MenuItemLink>
                  <MenuItemLink to='/register'>Register</MenuItemLink>
                </>
              }
            </Box>
            
          </Toolbar>
          
        </Container>
        <FilterClustersHorizontal/>




      </AppBar>
    </Box>
  )
}
