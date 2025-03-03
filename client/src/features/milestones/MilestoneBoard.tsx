import { Box, Card, Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { useProjects } from "../../lib/hooks/useProjects";
import MilestoneControlBar from "../common/controlBars/MilestoneControlBar";
import MilestoneProjectCard from "./MilestoneProjectCard";

const MilestoneBoard = observer(function MilestoneBoard() {
  
  const { milestoneStore, projectStore } = useStore();
  const { projects, isPending } = useProjects();
  

  if (!projects || isPending) return <Typography>Loading...</Typography>;


  return (
    <Box>
      <MilestoneControlBar />
      <Grid2 container gap={1.5} mt={2}>
        {[0, 1, 2, 3].map(index => {
          const milestoneFilter = projectStore.projects.filter(
            project => project.milestoneID === (milestoneStore.id * 4 + index)
          );

          return (
            <Grid2 size={2.925} key={index}>
              <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
                <Box mb={1} mt={1} display="flex" justifyContent="center">
                  {milestoneStore.Milestone[milestoneStore.id * 4 + index]}
                </Box>
              </Card>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {milestoneFilter.map(project => (
                  <MilestoneProjectCard 
                    key={project.id} 
                    project={project} />
                ))}
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
});

export default MilestoneBoard;