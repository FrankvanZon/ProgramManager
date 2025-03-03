import { Box, Grid2 } from "@mui/material";
import ProgramPlanner from "./ProgramPlanner";
import ProgramFilter from "./ProgramSideBar";
import YearControlBar from "../common/controlBars/YearControlBar";
import { observer } from "mobx-react-lite";

const ProgramBoard = observer(function ProgramBoard() {
  return (
    <Box>
    <YearControlBar/>
    <Grid2 mt={2} container spacing={3}>
    <Grid2 size={8}>
        <ProgramPlanner />
    </Grid2>
    <Grid2 size={4}>
        <ProgramFilter />
    </Grid2>
    </Grid2>
    </Box>

  )
})

export default ProgramBoard