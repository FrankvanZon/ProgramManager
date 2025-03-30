import { Box, Grid2, Paper } from "@mui/material";
import ProgramPlanner from "./ProgramPlanner";

import YearControlBar from "../common/controlBars/YearControlBar";
import { observer } from "mobx-react-lite";
import ProjectTeamUpdate from "../projects/form/ProjectTeamUpdate";
import FilterClusters from "../common/filters/FilterClusters";


const ProgramBoard = observer(function ProgramBoard() {



  return (
    <Box>
    <YearControlBar/>
    <Grid2 mt={2} container spacing={3}>
    <Grid2 size={8}>
        <ProgramPlanner  />
    </Grid2>
    <Grid2 size={4} sx={{display: 'flex', flexDirection: 'column', gap:3, borderRadius:2}}>
        <Paper sx={{ borderRadius: 2, padding: 2 }}>
        <FilterClusters />
        </Paper>

        <ProjectTeamUpdate />
        
    </Grid2>
    </Grid2>
    </Box>

  )
})

export default ProgramBoard