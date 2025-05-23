import { CalendarMonth, Info, Place } from "@mui/icons-material";
import { Box, Divider, Grid2, Paper, Tab, Tabs, Typography } from "@mui/material";
import ProjectTeamUpdate from "../form/ProjectTeamUpdate";
import MilestoneDetails from "../../milestones/MilestoneDetails";
import { SyntheticEvent, useState } from "react";
import MilestoneSelector from "../../milestones/MilestoneSelector";

type Props = {
    project: Project
}

export default function ProjectDetailsInfo({ project }: Props) {
    const [value, setValue] = useState(2);

    const HandleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const tabContent = [
        { label: 'VPC', content: <MilestoneDetails MilestoneIds={[-2, -1]} Milestones={['Start', 'Finish']} PhaseFilter="VPC" /> },
        { label: 'APC', content: <MilestoneDetails MilestoneIds={[0, 1, 2, 3]} Milestones={['PI', 'PS', 'PC', 'PR']} PhaseFilter="APC" /> },
        { label: 'NPDL', content: <MilestoneDetails MilestoneIds={[4, 5, 6, 7, 8, 9, 10, 11]} Milestones={['PI', 'PS', 'AA', 'PPC', 'PV', 'SR', 'CR']} PhaseFilter="NPDL" /> },
        { label: 'CIB', content: <MilestoneDetails MilestoneIds={[12, 13, 14, 15]} Milestones={['CI', 'CRA', 'IPA', 'RP']} PhaseFilter="CIB" /> },
    ]


    return (
        <>
            <Paper sx={{ mb: 2 }}>

                <Grid2 container alignItems="center" pl={2} py={1}>
                    <Grid2 size={1}>
                        <Info color="info" fontSize="large" />
                    </Grid2>
                    <Grid2 size={11}>
                        <Typography>{project.program} | {project.cluster} | {project.category}</Typography>
                    </Grid2>
                </Grid2>
                <Divider />
                <Grid2 container alignItems="center" pl={2} py={1}>
                    <Grid2 size={1}>
                        <CalendarMonth color="info" fontSize="large" />
                    </Grid2>
                    <Grid2 size={11}>
                        <Typography>Target Launch Quarter {project.launchQuarter}</Typography>
                    </Grid2>
                </Grid2>
                <Divider />

                <Grid2 container alignItems="center" pl={2} py={1}>
                    <Grid2 size={1}>
                        <Place color="info" fontSize="large" />
                    </Grid2>
                    <Grid2 size={11}>
                        <Typography>Next milestone {project.programStatus}</Typography>
                    </Grid2>
                </Grid2>
            </Paper>
            <ProjectTeamUpdate />

            <Paper>
                <Box sx={{ padding: 2 }}>
                    <MilestoneSelector project={project} />
                </Box>

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
