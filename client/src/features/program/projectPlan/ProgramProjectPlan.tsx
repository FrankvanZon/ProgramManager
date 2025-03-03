import { Box, Button, Grid2, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import ProgramProjectSelection from "../projectPlan/ProgramProjectPhaseSelection";
import { useState } from "react";
import ProgramProjectPlanSlider from "./ProgramProjectPlanSlider";

type Props = {
    project: Project
}

export default function ProgramOfProject({ project }: Props) {
    const [expandPlan, setExpandPlan] = useState(false);
    const [showVPC, setShowVPC] = useState(false);
    const [showAPC, setShowAPC] = useState(false);
    const [showNPDL, setShowNPDL] = useState(false);




    const handleExpanPlan = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setExpandPlan(!expandPlan);
    };

    return (
        <>
            <Grid2 container>
                <Grid2 size={2}>
                    <Box display={"flex"} >
                    <Button 
                            size='small' value="show" aria-label="show" color='success'
                            onClick={handleExpanPlan}
                            >
                            {expandPlan ? <ArrowUpward/> : <ArrowDownward/>}
                    </Button>

                        <Typography ml={1} mt={0.5} variant='subtitle2' >{project.name}</Typography>


                    </Box>
                </Grid2>

                <Grid2 size={10}>
                    <Box>
                       <ProgramProjectPlanSlider expandPlan={expandPlan} phase="Combined"/>
                    </Box>
                </Grid2>
            </Grid2>


            { (expandPlan) &&
            <Grid2 container>
                <Grid2 size={2}>
                    <ProgramProjectSelection 
                        showVPC={showVPC}
                        setShowVPC={setShowVPC}
                        showAPC={showAPC}
                        setShowAPC={setShowAPC}
                        showNPDL={showNPDL}
                        setShowNPDL={setShowNPDL} />
                </Grid2>
                <Grid2 size={10}>
                    <Box>
                        {(showVPC) && <ProgramProjectPlanSlider expandPlan={expandPlan} phase="VPC" />}
                        {(showAPC) && <ProgramProjectPlanSlider expandPlan={expandPlan} phase="APC" />}
                        {(showNPDL) && <ProgramProjectPlanSlider expandPlan={expandPlan} phase="NPDL" />}
                    </Box>
                </Grid2>
            </Grid2> }
        </>
    )
}