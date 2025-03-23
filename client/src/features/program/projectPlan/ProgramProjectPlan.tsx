import { Box, Button, Grid2, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import ProgramProjectSelection from "../projectPlan/ProgramProjectPhaseSelection";
import { useState } from "react";
import ProgramProjectPlanSlider from "./ProgramProjectPlanSlider";


type Props = {
    project: Project
}

export default function ProgramProjectPlan({ project }: Props) {
    const [expandPlan, setExpandPlan] = useState(false);
    const [showVPC, setShowVPC] = useState(false);
    const [showAPC, setShowAPC] = useState(false);
    const [showNPDL, setShowNPDL] = useState(false);
    const [showCIB, setShowCIB] = useState(false);

    const checkPhaseRequired = (phaseName: string): boolean => {
        const phase = project.phases.find(p => p.phase === phaseName);
        return phase ? phase.required : false;
    };


   
    const handleExpanPlan = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setExpandPlan(!expandPlan);
        setShowVPC(checkPhaseRequired("VPC"));
        setShowAPC(checkPhaseRequired("APC"));
        setShowNPDL(checkPhaseRequired("NPDL"));
        setShowCIB(checkPhaseRequired("CIB"));
    };
    
    return (
        <>
            <Grid2 container>
                <Grid2 size={3}>
                    <Box display={"flex"} width="100%" >
                    <Button 
                            size='small' value="show" aria-label="show" color='success'
                            onClick={handleExpanPlan}
                            >
                            {expandPlan ? <ArrowUpward/> : <ArrowDownward/>}
                    </Button>

                        <Typography ml={1} mt={0.5} mb={1} variant='subtitle1' >{project.name}</Typography>


                    </Box>
                </Grid2>

                <Grid2 size={9}>
                    <Box>
                       <ProgramProjectPlanSlider 
                        expandPlan={expandPlan} 
                        phase="Combined"
                        project={project}/>
                    </Box>
                </Grid2>
            </Grid2>


            { (expandPlan) &&
            <Grid2 container>
                <Grid2 size={3} >
                    <ProgramProjectSelection
                        showVPC={showVPC}
                        setShowVPC={setShowVPC}
                        showAPC={showAPC}
                        setShowAPC={setShowAPC}
                        showNPDL={showNPDL}
                        setShowNPDL={setShowNPDL}
                        showCIB={showCIB}
                        setShowCIB={setShowCIB}
                        project={project} />
                </Grid2>
                <Grid2 size={9} alignContent={"center"}>
                    <Box>
                        {(showVPC) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="VPC" />}
                        {(showAPC) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="APC" />}
                        {(showNPDL) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="NPDL" />}
                        {(showCIB) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="CIB" />}
                    </Box>
                </Grid2>
            </Grid2> }
        </>
    )
}