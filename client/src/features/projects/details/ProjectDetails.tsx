import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    project: Project
    cancelSelectProject : () => void;
    openForm : (id:string) => void;
}

export default function ProjectDetails({project, cancelSelectProject, openForm}: Props) {
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
            <Button onClick={() => openForm(project.id)} color="primary">Edit</Button>
            <Button onClick={cancelSelectProject} color="inherit">Cancel</Button>
        </CardActions>
        </Box>
    </Card>
  )
}