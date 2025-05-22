import { Box, Card, Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { useProjects } from "../../lib/hooks/useProjects";
import MilestoneControlBar from "../common/controlBars/MilestoneControlBar";
import MilestoneProjectCard from "./MilestoneProjectCard";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";



const MilestoneBoard = observer(function MilestoneBoard() {
  const queryClient = useQueryClient();
  const { milestoneStore } = useStore();
  const { projects } = useProjects();
  const location = useLocation();

  const [msProjectStore, setMsProjectStore] = useState<Project[]>(projects || []);

  useEffect(() => {
    if (location.pathname === "/milestones") {
      milestoneStore.resetFilters();
    }
  }, [location, milestoneStore]);


  useEffect(() => {
    if (projects) {
      setMsProjectStore(projects);
    }
  }, [projects]);



  if (!projects) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <MilestoneControlBar />
      <Grid2 container spacing={1} mt={2} >
        {[0, 1, 2, 3].map(index => {
          const group = milestoneStore.MilestonesGrouped[milestoneStore.id + index];
          if (!group) return null;

          const milestoneFilter = msProjectStore.filter(project =>
            group.phaseIds.includes(project.milestoneID)
          );

          return (
            <Grid2 size={{ xs: 3 }} key={group.milestone + group.phase}>
              <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
                <Box mb={1} mt={1} display="flex" justifyContent="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold' }}
                    color={group.milestoneColor}
                  >
                    {group.phase} | {group.milestone}
                  </Typography>
                </Box>
              </Card>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {milestoneFilter.map(project => (
                  <MilestoneProjectCard
                    key={project.id}
                    project={project}
                    filterUpdate={() =>
                      queryClient.invalidateQueries({ queryKey: ['projects'] })
                    }
                  />
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