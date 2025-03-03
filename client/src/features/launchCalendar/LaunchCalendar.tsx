import { Box, Card, Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import LaunchCalendarProjectCard from "./LaunchCalendarProjectCard";
import { useProjects } from "../../lib/hooks/useProjects";
import YearControlBar from "../common/controlBars/YearControlBar";




const LaunchCalendar = observer(function LaunchCalendar() {
  const { yearStore } = useStore()
  const { projects, isPending } = useProjects()

  if (!projects || isPending) return
  <Typography>Loading...</Typography>


  return (
    <Box>
      <YearControlBar />

      <Grid2 container gap={1.5} mt={2}>
        <Grid2 size={2.9}>
          <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
            <Box mb={1} mt={1}
              display="flex"
              justifyContent="center" >
              {yearStore.Q1}
            </Box>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {projects
              .filter(project => project.launchQuarter === yearStore.Q1)
              .map(project => (
                <LaunchCalendarProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
          </Box>

        </Grid2>

        <Grid2 size={2.9}>
          <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
            <Box mb={1} mt={1}
              display="flex"
              justifyContent="center" >
              {yearStore.Q2}
            </Box>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {projects
              .filter(project => project.launchQuarter === yearStore.Q2)
              .map(project => (
                <LaunchCalendarProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
          </Box>

        </Grid2>

        <Grid2 size={2.9}>
          <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
            <Box mb={1} mt={1}
              display="flex"
              justifyContent="center" >
              {yearStore.Q3}
            </Box>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {projects
              .filter(project => project.launchQuarter === yearStore.Q3)
              .map(project => (
                <LaunchCalendarProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
          </Box>

        </Grid2>

        <Grid2 size={2.9}>
          <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb: 2 }}>
            <Box mb={1} mt={1}
              display="flex"
              justifyContent="center" >
              {yearStore.Q4}
            </Box>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {projects
              .filter(project => project.launchQuarter === yearStore.Q4)
              .map(project => (
                <LaunchCalendarProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
          </Box>

        </Grid2>


      </Grid2>
    </Box>
  )
})

export default LaunchCalendar;