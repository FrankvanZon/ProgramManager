import { CalendarMonth, Info, Place } from "@mui/icons-material";
import { Divider, Grid2, Paper, Typography } from "@mui/material";
import ProjectTeamUpdate from "../form/ProjectTeamUpdate";
import MilestoneDetails from "../../milestones/MilestoneDetails";
// import { formatDate } from "../../../lib/util/util";

type Props = {
    project: Project
}

export default function ProjectDetailsInfo({project}: Props) {
    
    const sampleData = [
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 34 },
        { id: 3, name: 'Charlie', age: 22 },
        { id: 4, name: 'Diana', age: 30 },
        { id: 5, name: 'Eve', age: 25 }
    ];
    
    
    
    return (
        <>
        <Paper sx={{ mb: 2 }}>

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Info color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{project.description}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <CalendarMonth color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{project.launchQuarter}</Typography>
                </Grid2>
            </Grid2>
            <Divider />

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Place color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    
                </Grid2>
            </Grid2>
        </Paper>
         <ProjectTeamUpdate/>

         <MilestoneDetails data={sampleData}/>
         </>
    )
}
