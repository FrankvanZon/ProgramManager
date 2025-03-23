import { Box, Card, Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import LaunchCalendarProjectCard from "./LaunchCalendarProjectCard";
import { useProjects } from "../../lib/hooks/useProjects";
import YearControlBar from "../common/controlBars/YearControlBar";




const LaunchCalendar = observer(function LaunchCalendar() {
  const { yearStore } = useStore()
  const { projects, isLoading } = useProjects()
  //const FilterCommitted = true;
  const FilterMinMilestoneID = 6;

  if (!projects || isLoading) return
  <Typography>Loading...</Typography>


 

  return (
    <Box>

      <YearControlBar />

      <Grid2 container gap={1.5} mt={2}>
        {[1, 2, 3, 4].map(index => (
          <Grid2 key={index} size={2.9}>
            <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
              <Box mb={1} mt={1} display="flex" justifyContent="center">
                {yearStore.YearQuarter(index)}
              </Box>
            </Card>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
              {["Trunking", "Industry", "Office", "Retail"].map(cluster => {
                const filteredProjects = projects.filter(project =>
                  project.phases.find(p => (p.phase === "NPDL" && p.required) || (p.phase === "CIB" && p.required))?.finishQuarter === yearStore.YearQuarter(index) &&
                  project.milestoneID >= FilterMinMilestoneID &&
                  project.cluster === cluster
                );

                return filteredProjects.length > 0 ? (
                  <Box key={cluster} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" >{cluster}</Typography>
                    {filteredProjects.map(project => (
                      <LaunchCalendarProjectCard key={project.id} project={project} />
                    ))}
                  </Box>
                ) : null;
              })}
            </Box>

          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
})

export default LaunchCalendar;