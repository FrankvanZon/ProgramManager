import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router";
import { useProjects } from "../../../lib/hooks/useProjects";

export default function ProjectDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {project, isLoadingProject} = useProjects(id); 

    if (isLoadingProject) return <Typography>Loading...</Typography>

    if (!project) return <Typography>Project not found</Typography>
  
    return (
    <Card sx={{borderRadius:3, display: 'flex'}}>
        <CardMedia 
            component='img'
            sx={{width: 100}}
            src={`/images/clusterImages/${project.cluster}.jpg`}
        />
        <Box>
        <CardContent>
            <Typography variant="h5">{project.name}</Typography>
            <Typography variant="subtitle1" fontWeight='light'>CR: {project.releaseDate}</Typography>
            <Typography variant="body1">{project.category} | {project.description}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => navigate(`/manage/${project.id}`)} color="primary">Edit</Button>
            <Button onClick={() => navigate('/projects')} color="inherit">Cancel</Button>
        </CardActions>
        </Box>
    </Card>
  )
}