import { CalendarMonth, Info, Place } from "@mui/icons-material";
import { Box, Divider, Grid2, Paper, Tab, Tabs, Typography } from "@mui/material";
import ProjectTeamUpdate from "../form/ProjectTeamUpdate";
import MilestoneDetails from "../../milestones/MilestoneDetails";
import { SyntheticEvent, useState } from "react";
// import { formatDate } from "../../../lib/util/util";

type Props = {
    project: Project
}



export default function ProjectDetailsInfo({ project }: Props) {
    const [value, setValue] = useState(1);

    const HandleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }


    const tabContent = [
        { label: 'APC', content: <MilestoneDetails Milestones={['PI', 'PS', 'PC', 'PR']} PhaseFilter="APC" /> },
        { label: 'NPDL', content: <MilestoneDetails Milestones={['PI', 'PS', 'AA', 'PPC', 'PV', 'SR', 'CR']} PhaseFilter="NPDL" /> },
    ]


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
            <ProjectTeamUpdate />

            <Paper>
            <Tabs
                orientation="horizontal"
                value={value}
                onChange={HandleChange}
                sx={{ borderRight: 1 }}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
                ))}
            </Tabs>
            <Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>
                {tabContent[value].content}
            </Box>
            </Paper>

        </>
    )
}
