import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import LaunchCalendarProjectCard from "./LaunchCalendarProjectCard";
import { useProjects } from "../../lib/hooks/useProjects";




const LaunchCalendar = observer(function LaunchCalendar() {
const{yearStore} = useStore()
const {projects, isPending} = useProjects()

if (!projects || isPending) return
<Typography>Loading...</Typography>


  return (
    <Box>
      
      <Card elevation={2} sx={{ borderRadius: 2, gap: 1 }}>
      <Box display='flex' alignItems='center' justifyContent='space-between' mb={1} mt={1} mr={1} ml={1}>
        <Button onClick={()=> yearStore.decrement()}><ArrowBack/></Button>
        {yearStore.Year}
        <Button onClick={()=> yearStore.increment()}><ArrowForward/></Button>
      </Box>
      </Card>
      

    <Grid2 container gap={1.5} mt={2}>
      <Grid2 size={2.9}>
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb:2}}>
          <Box mb={1} mt={1}
            display="flex" 
            justifyContent="center" >
            {yearStore.Q1}
          </Box>
        </Card>
        
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                {projects.map(project => (
                    <LaunchCalendarProjectCard key={project.id} 
                      project={project}
                      />
                ))}
            </Box>
          
      </Grid2>

      <Grid2 size={2.9}>
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1, mb:2 }}>
        <Box mb={1} mt={1}
            display="flex" 
            justifyContent="center" >
            {yearStore.Q2}
          </Box>
        </Card>
      

      </Grid2>

      <Grid2 size={2.9}>
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1,mb:2 }}>
        <Box mb={1} mt={1}
            display="flex" 
            justifyContent="center" >
            {yearStore.Q3}
          </Box>
        </Card>

      </Grid2>

      <Grid2 size={2.9}>
        <Card elevation={2} sx={{ borderRadius: 2, gap: 1,mb:2 }}>
        <Box mb={1} mt={1}
            display="flex" 
            justifyContent="center" >
            {yearStore.Q4}
        </Box>
        </Card>

      </Grid2>


    </Grid2>  
    </Box>
  )
})

export default LaunchCalendar;