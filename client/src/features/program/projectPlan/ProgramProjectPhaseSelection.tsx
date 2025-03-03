import * as React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface Props {
  showVPC : boolean;
  setShowVPC : (id: boolean) => void;
  showAPC : boolean;
  setShowAPC : (id: boolean) => void;
  showNPDL : boolean;
  setShowNPDL : (id: boolean) => void;
}



export default function ProgramProjectSelection({
  showVPC,setShowVPC, showAPC, setShowAPC, showNPDL, setShowNPDL
} : Props) {
  
  const handleVPC = () => {
    setShowVPC(!showVPC);
  };

  const handleAPC = () => {
    setShowAPC(!showAPC);
  };

  const handleNPDL = () => {
    setShowNPDL(!showNPDL);
  };



  return (
    <ButtonGroup size='small'
    >
      <Button value="VPC" aria-label="VPC" 
        color={showVPC ? 'error' : 'inherit'}
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
    </ButtonGroup>
  );
}