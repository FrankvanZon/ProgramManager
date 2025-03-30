import { Box, Card, CardContent, Divider, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router"

type Props = {
    project: Project
}

export default function MilestoneCard({project}: Props) {
const navigate = useNavigate();
    
  return (
    <Link 
        to={`/projects/${project.id}`} 
        onClick={() => navigate(`/projects/${project.id}`)}
        style={{textDecoration: 'none'}}>
        <Card sx={{borderRadius:2, p:3, maxWidth:300, textDecoration: 'none', alignItems: 'center'}}
            elevation={4}
            >
            {/* <CardMedia component='img' src={`/images/clusterImages/${project.cluster}.jpg`} 
            sx={{width: 150, height:150, zIndex:50,
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto',
            }}
            alt={project.name}
            /> */}
            
            <CardContent>
                <Box display={"flex"} flexDirection="column" alignItems="center" gap={1}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>{project.name}</Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>Go to details</Typography>

                </Box>
            </CardContent>
            <Divider sx={{mb:2}} />
            <Box display={"flex"} flexDirection="column" alignItems="start">
                <Typography variant="body1" sx={{ textAlign: 'start' }}>PS : 25wk24</Typography>
                <Typography variant="body1" sx={{ textAlign: 'start' }}>PPC : 25wk34</Typography>
            </Box>
        </Card>
    </Link>
  )
}