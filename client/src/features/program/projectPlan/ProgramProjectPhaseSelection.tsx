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
  const {updateProject} = useProjects(id);

  const handleVPC = () => {
    let data: Project = { ...project }
    data = project;
    data.projectPhaseVPC = !project.projectPhaseVPC;
    setShowVPC(data.projectPhaseVPC)
    updateProject.mutate(data);
  };

  const handleAPC = () => {
    let data: Project = { ...project }
    data = project;
    data.projectPhaseAPC = !project.projectPhaseAPC;
    setShowAPC(data.projectPhaseAPC)
    updateProject.mutate(data);
  };

  const handleNPDL = () => {
    let data: Project = { ...project }
    data = project;
    data.projectPhaseNPDL = !project.projectPhaseNPDL;
    setShowNPDL(data.projectPhaseNPDL)
    updateProject.mutate(data);
  };

  const handleCIB = () => {
    //let data: Project = { ...project }
    //data = project;
    //data.projectPhaseNPDL = !project.projectPhaseNPDL;
    setShowCIB(!showCIB)
    //updateProject.mutate(data);
  };



  return (
    <Box display="flex" justifyContent="center" width="100%" mb={1}>
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