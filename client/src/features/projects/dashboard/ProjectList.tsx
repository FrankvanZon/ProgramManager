import { Box, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../../lib/hooks/useProjects";

export default function ProjectList() {
  const {projects, isLoading} = useProjects()

  if (isLoading) return
      <Typography>Loading...</Typography>

  if(!projects) return 
      <Typography>Projects not available</Typography>

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {projects.map(project => (
            <ProjectCard key={project.id} 
              project={project}
              />
        ))}
    </Box>
  )
}