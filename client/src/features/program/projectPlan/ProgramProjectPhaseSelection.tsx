import * as React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useProjects } from '../../../lib/hooks/useProjects';
import { useParams } from 'react-router';


interface Props {
  showVPC : boolean;
  setShowVPC : (id: boolean) => void;
  showAPC : boolean;
  setShowAPC : (id: boolean) => void;
  showNPDL : boolean;
  setShowNPDL : (id: boolean) => void;
  showCIB : boolean;
  setShowCIB : (id: boolean) => void;
  project : Project;
}



export default function ProgramProjectSelection({
  showVPC,setShowVPC, showAPC, setShowAPC, showNPDL, setShowNPDL, showCIB, setShowCIB, project
} : Props) {
  
  const {id} = useParams();
  const {setProjectPhase} = useProjects(id);

  const getProjectPhase = (phaseName: string) => {
    const phase = project.phases.find(p => p.phase === phaseName);
    if (phase) {
        return phase;
    } else {
        // Return a new ProjectPhase object with preset information
        return {
            projectId: project.id,
            phase: phaseName,
            required: false, 
            startQuarter: 0, 
            finishQuarter: 0
        };
    }
};


  const handleVPC = () => {
    const data: ProjectPhase = getProjectPhase("VPC")
    setShowVPC(!data.required)
    setProjectPhase.mutate(data);
  };

  const handleAPC = () => {
    const data: ProjectPhase = getProjectPhase("APC")
    setShowAPC(!data.required)
    setProjectPhase.mutate(data);
  };

  const handleNPDL = () => {
    const data: ProjectPhase = getProjectPhase("NPDL")
    setShowNPDL(!data.required)
    setProjectPhase.mutate(data);
  };

  const handleCIB = () => {
    const data: ProjectPhase = getProjectPhase("CIB")
    setShowCIB(!data.required)
    setProjectPhase.mutate(data);
  };



  return (
    <Box display="flex" justifyContent="center" width="100%" mb={2}>
    <ButtonGroup size='small'
    >
      <Button value="VPC" aria-label="VPC" 
        color={showVPC ? 'warning' : 'inherit'}
        onClick={handleVPC}>
        V
      </Button>

      <Button value="APC" aria-label="APC" 
        color={showAPC ? 'info' : 'inherit'}
        onClick={handleAPC}>
        A
      </Button>
      <Button value="NPDL" aria-label="NPDL"
        color={showNPDL ? 'success' : 'inherit'}
        onClick={handleNPDL}>
        N
      </Button>
      <Button value="CIB" aria-label="CIB"
        color={showCIB ? 'secondary' : 'inherit'}
        onClick={handleCIB}>
        C
      </Button>
    </ButtonGroup>
    </Box>
  );
}