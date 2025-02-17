import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"

type Props = {
    project: Project
    selectProject : (id: string) => void;
    openForm : (id:string) => void;
    deleteProject: (id :string) => void;
}

export default function ProjectCard({project, selectProject, openForm, deleteProject}: Props) {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5">{project.name}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>CR: {project.releaseDate}</Typography>
        <Typography variant="subtitle1">{project.cluster} | {project.team}</Typography>
        <Typography variant="body2">{project.category} | {project.description}</Typography>
      </CardContent>

          <CardActions sx={{ display:'flex', justifyContent: 'space-between'}}>
          <Chip label={project.launchQuarter} variant="outlined" />
          <Box display='flex' gap={1}>
            <Button onClick={() => selectProject(project.id)} size="medium" variant="contained">View</Button>
            <Button onClick={() => openForm(project.id)} size="medium" variant="contained">Edit</Button>
            <Button onClick={() => openForm(project.id)} size="medium" variant="contained">Team</Button>
            <Button onClick={() => deleteProject(project.id)} size="medium" variant="contained" color="error">Delete</Button>
          </Box>
          </CardActions>
    </Card>
  )
}