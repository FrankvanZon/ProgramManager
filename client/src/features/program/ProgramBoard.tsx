import { Grid2 } from "@mui/material";
import ProgramPlanner from "./ProgramPlanner";
import ProgramFilter from "./ProgramFilter";

export default function ProgramBoard() {
  return (
    <Grid2 container spacing={3}>
    <Grid2 size={8}>
        <ProgramPlanner />
    </Grid2>
    <Grid2 size={4}>
        <ProgramFilter />
    </Grid2>
    </Grid2>

  )
}