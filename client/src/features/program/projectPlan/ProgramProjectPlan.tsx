import { Box, Button, Grid2, IconButton, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward, GroupAdd } from "@mui/icons-material";
import ProgramProjectSelection from "../projectPlan/ProgramProjectPhaseSelection";
import { useEffect, useState } from "react";
import ProgramProjectPlanSlider from "./ProgramProjectPlanSlider";
import { useLocation, useNavigate } from "react-router";
import { useStore } from "../../../lib/hooks/useStore";


type Props = {
    project: Project
}

export default function ProgramProjectPlan({ project }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { yearStore } = useStore();
    const [expandPlan, setExpandPlan] = useState(false);
    const [showVPC, setShowVPC] = useState(false);
    const [showAPC, setShowAPC] = useState(false);
    const [showNPDL, setShowNPDL] = useState(false);
    const [showCIB, setShowCIB] = useState(false);
    const [combinedValue, setCombinedValue] = useState<number[]>([0, 11]);

    const checkPhaseRequired = (phaseName: string): boolean => {
        const phase = project.phases.find(p => p.phase === phaseName);
        return phase ? phase.required : false;
    };

    const isOnProjectPage = location.pathname === `/projects/${project.id}`;

    useEffect(() => {
        const { startQuarter, finishQuarter } = project.phases
          .filter(phase => phase.required) // Filter phases where required is true
          .reduce((acc, curr) => {
            return {
              startQuarter: Math.min(acc.startQuarter, curr.startQuarter),
              finishQuarter: Math.max(acc.finishQuarter, curr.finishQuarter)
            };
          }, { startQuarter: 100000, finishQuarter: 0 });
    
        setCombinedValue([
          startQuarter === 100000 ? 0 : yearStore.InverseQuarter(startQuarter),
          yearStore.InverseQuarter(finishQuarter)
        ]);
      }, [project.phases, yearStore, yearStore.Year, setCombinedValue]);

    useEffect(() => {
        if (isOnProjectPage) {
            setExpandPlan(true);
            setShowVPC(checkPhaseRequired("VPC"));
            setShowAPC(checkPhaseRequired("APC"));
            setShowNPDL(checkPhaseRequired("NPDL"));
            setShowCIB(checkPhaseRequired("CIB"));
        }
    }, [isOnProjectPage, project]);


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
                    {!isOnProjectPage && (
                        <Box display={"flex"} width="100%" >

                            
                            <Button
                                size='small' value="show" aria-label="show" color='success'
                                onClick={handleExpanPlan}
                            >
                                {expandPlan ? <ArrowUpward /> : <ArrowDownward />}
                            </Button>
                            
                            <IconButton 
                                onClick={() => navigate(`/program/${project.id}`)}>
                            <GroupAdd/>
                            </IconButton>

                            <Typography ml={1} mt={0.5} mb={1} variant='subtitle1' >{project.name}</Typography>
                            
                        </Box>)}
                </Grid2>

                <Grid2 size={9}>
                    <Box>
                        <ProgramProjectPlanSlider
                            expandPlan={expandPlan}
                            phase="Combined"
                            project={project}
                            combinedValue={combinedValue}
                            setCombinedValue={setCombinedValue} />
                    </Box>
                </Grid2>
            </Grid2>


            {(expandPlan) &&
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
                            {(showVPC) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="VPC" 
                                combinedValue={combinedValue} setCombinedValue={setCombinedValue} />}
                            {(showAPC) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="APC" 
                                combinedValue={combinedValue} setCombinedValue={setCombinedValue} />}
                            {(showNPDL) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="NPDL" 
                                combinedValue={combinedValue} setCombinedValue={setCombinedValue} />}
                            {(showCIB) && <ProgramProjectPlanSlider project={project} expandPlan={expandPlan} phase="CIB" 
                                combinedValue={combinedValue} setCombinedValue={setCombinedValue} />}
                        </Box>
                    </Grid2>
                </Grid2>}
        </>
    )
}