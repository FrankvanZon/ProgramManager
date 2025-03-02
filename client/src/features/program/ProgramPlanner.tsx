import { Box, Paper } from "@mui/material";
import ProgramByTeam from "./ProgramByTeam";

export default function ProgramPlanner() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:3, borderRadius:2}}>
        <Paper sx={{p:3, borderRadius:2}} >
            <ProgramByTeam/>
        </Paper>
    </Box>
  )
}