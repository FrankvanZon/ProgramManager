import { Box, Paper, Tab, Tabs } from "@mui/material";
import ProjectDetailsProjectPlan from "./ProjectDetailsProjectPlan";
import { SyntheticEvent, useState } from "react";
import ProjectDetailsPhotos from "./ProjectDetailsPhotos";

type Props = {
    project: Project
}


export default function ProjectDetailsSidebar({project} : Props) {
const [value, setValue] = useState(0);

    const HandleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const tabContent = [
        { label: 'Plan', content: <ProjectDetailsProjectPlan project={project} /> },
        { label: 'Photo', content: <ProjectDetailsPhotos project={project}/> },

    ]


    return (
         <Paper sx={{mb: 3}}>
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
                <Box sx={{ flexGrow: 1, p: 3, pt: 3 }}>
                    {tabContent[value].content}
                </Box>
            </Paper>
    );
}
