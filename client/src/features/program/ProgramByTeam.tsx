import { Box, Typography } from "@mui/material";
import { useProjects } from "../../lib/hooks/useProjects";
import ProgramOfProject from "./projectPlan/ProgramProjectPlan";

export default function ProgramByTeam() {
    const {projects, isPending} = useProjects()
  
    if (!projects || isPending) return
        <Typography>Loading...</Typography>
  
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
          <Typography>Team name</Typography>
          {projects.map(project => (
              <ProgramOfProject key={project.id} 
                project={project}
                />
          ))}
      </Box>
    )
  }