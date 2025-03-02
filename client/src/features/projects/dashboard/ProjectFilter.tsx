import { Event } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import FilterClusters from "../../common/filters/FilterClusters";

export default function ProjectFilter() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:3, borderRadius:2}}>
        <Paper sx={{p:3, borderRadius:2}} >
            <FilterClusters/>
        </Paper>

        <Box component={Paper} sx={{width:'100%', p:3, borderRadius:2}}>
            <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb:1 , color: 'primary.main'}}>
                <Event sx={{mr:1}}/>
                Select date
            </Typography>
            <Calendar/>
        </Box>
    </Box>
  )
}