import { Box, Paper, Typography } from "@mui/material";

import { useProjects } from "../../lib/hooks/useProjects";

import ProgramProjectPlan from "./projectPlan/ProgramProjectPlan";


export default function ProgramPlanner() {
  const { projects, isLoading } = useProjects()
  
    const getUniqueTeams = (projects: Project[]) => {
      const teams = projects.map(project => project.team);
      return [...new Set(teams)];
    };
  
  
  
  
    if (!projects || isLoading) return
    <Typography>Loading...</Typography>
  
    const uniqueTeams = getUniqueTeams(projects);
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>
        {uniqueTeams.sort().map(team => {
          const filteredProjects = projects.filter(project =>
            project.team === team
          ).sort((a, b) => {
            if (!a.launchQuarter || a.launchQuarter === 0) return 1;
            if (!b.launchQuarter || b.launchQuarter === 0) return -1;
            return a.launchQuarter - b.launchQuarter;
          });
  
          return filteredProjects.length > 0 ? (
            <Paper key={team} sx={{borderRadius:2}}>
            <Box key={team} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" mt={2} ml={2}>{team}</Typography>
              {filteredProjects.map(project => (
                <ProgramProjectPlan key={project.id} project={project} />
              ))}
            </Box>
            </Paper>
          ) : null;
        })}
      </Box>
    )
  }