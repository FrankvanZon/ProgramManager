import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useProjects } from "../../../lib/hooks/useProjects";
import { useNavigate } from "react-router";

type Props = {
    project: Project
}

export default function ProjectCard({project}: Props) {
  const navigate = useNavigate();
  const{deleteProject} = useProjects();

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5">{project.name}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}> {project.launchQuarter} CR: {project.releaseDate}</Typography>
        <Typography variant="subtitle1">{project.cluster} | {project.team}</Typography>
        <Typography variant="body2">{project.category} | {project.description}</Typography>
      </CardContent>

          <CardActions sx={{ display:'flex', justifyContent: 'space-between'}}>
          <Chip label={project.milestone} variant="outlined" />
          <Box display='flex' gap={1}>
            <Button onClick={() => navigate(`/projects/${project.id}`)} size="medium" variant="contained">View</Button>
            <Button onClick={() => navigate(`/manage/${project.id}`)} size="medium" variant="contained">Edit</Button>
            <Button size="medium" variant="contained">Team</Button>
            <Button 
              onClick={() => deleteProject.mutate(project.id)}
              disabled={deleteProject.isPending} 
              size="medium" variant="contained" color="error">Delete</Button>
          </Box>
          </CardActions>
    </Card>
  )
}