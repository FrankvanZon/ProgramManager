import { Box, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../../lib/hooks/useProjects";

export default function ProjectList() {
  const {projects, isPending} = useProjects()

  if (!projects || isPending) return
      <Typography>Loading...</Typography>

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