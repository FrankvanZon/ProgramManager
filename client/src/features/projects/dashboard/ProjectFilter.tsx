import { Box, Paper } from "@mui/material";
import 'react-calendar/dist/Calendar.css'
import FilterMilestones from "../../common/filters/FilterMilestones";

export default function ProjectFilter() {

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:3, borderRadius:2}}>
        <Paper sx={{p:3, borderRadius:2}} >
            <FilterMilestones/>
        </Paper>
    </Box>
  )
}