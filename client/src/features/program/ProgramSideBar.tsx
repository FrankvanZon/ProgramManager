import { Box, Paper } from "@mui/material";
import 'react-calendar/dist/Calendar.css'
import FilterClusters from "../common/filters/FilterClusters";

export default function ProgramSideBar() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:3, borderRadius:2}}>
        <Paper sx={{p:3, borderRadius:2}} >
            <FilterClusters/>
        </Paper>
    </Box>
  )
}