import { Box, Typography } from "@mui/material";
import ProgramProjectPlan from "../../program/projectPlan/ProgramProjectPlan";
import YearControlBar from "../../common/controlBars/YearControlBar";

type Props = {
    project: Project
}


export default function ProjectDetailsProjectPlan({project} : Props) {
 return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h5">
                    Project plan
                </Typography>
            </Box>
            <YearControlBar/>
            <Box sx={{mt:1, mb:2}} >
            <Typography sx={{ml:2,p:1}} variant="subtitle2">{project.team}</Typography>
            <ProgramProjectPlan project={project} />
            </Box>
        </>
    );
}
