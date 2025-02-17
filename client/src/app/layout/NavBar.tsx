import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";

type Props = {
  openForm: () => void;
}

export default function NavBar({openForm}:Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #00E487 0%, #66EFB7 69%, #1432FF 89% )' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <EmojiObjectsIcon fontSize='large'/>
                <Typography variant="h4" fontWeight='bold'>Program Manager</Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItem sx={{ fontsize: '1.3rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Project List
              </MenuItem>
              <MenuItem sx={{ fontsize: '1.3rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Program View
              </MenuItem>
              <MenuItem sx={{ fontsize: '1.3rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Milestones
              </MenuItem>
              <MenuItem sx={{ fontsize: '1.3rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Launch Calendar
              </MenuItem>
            </Box>
            <Button 
              size='large' 
              variant="contained" 
              color="warning"
              onClick={openForm}
              >Create Project</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
