import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from 'react-router';


export default function HomePage() {

  
  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(135deg, #00E487 0%, #66EFB7 69%, #1432FF 89% )',
      }}
    >
        <Box sx={{display:'flex', alignItems: 'center', alignContent: 'center',
          color: 'white', gap:3}}>
            <EmojiObjectsIcon sx={{height:110, width:110}} />
            <Typography variant='h1'>Program Manager</Typography>
        </Box>
          <Typography variant='h2'>
            Welcome to Program Manager
          </Typography>
          <Button
            component={Link}
            to='/projects'
            variant='contained'
            sx={{height:80, borderRadius: 2, fontSize: '1.4rem'}}
            >
            Go to Projects
          </Button>
    </Paper>
  )
}