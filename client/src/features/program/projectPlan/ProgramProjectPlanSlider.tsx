import { Box, Slider } from "@mui/material";
import React, { useEffect } from "react";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

interface Props{
  expandPlan : boolean;
  phase: 'NPDL' | 'APC' | 'VPC' | 'Combined';
  project : Project;
}

const ProgramProjectPlanSlider = observer( function ProgramProjectPlanSlider({expandPlan, phase, project} : Props) {
  const {yearStore} = useStore();
  const [value, setValue] = React.useState<number[]>([0, 11]);
 
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    if (phase === 'Combined') {
      setValue([0, yearStore.InverseQuarter(project.launchQuarter)]);
    } else if (phase === 'NPDL') {
      setValue([0, yearStore.InverseQuarter(project.launchQuarter)]);
    }
  }, [phase, project.launchQuarter, yearStore, yearStore.Year]);


  const phaseColors: Record<Props['phase'], 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    'NPDL': 'success',
    'APC': 'primary',
    'VPC': 'warning',
    'Combined': 'primary'
  };

  
  
    return (
      <Box display={'flex'}>
        <Box sx={{width: 100 }}>
        </Box>
        <Box sx={{width: 600 }}>
          <Slider
            getAriaLabel={() => 'Year-Quarter range'}
            value={value}
            onChange={handleChange}
            disabled={phase === 'Combined'}
            valueLabelDisplay="off"
            min={0}
            max={11}
            color={phaseColors[phase]  || 'primary'}
            marks={Array.from({ length: 12 }, (_, index) => ({
              value: index,
              label: (expandPlan && phase === 'Combined') ? yearStore.Quarter(index): '',
            }))}
          />
        </Box>
      </Box>
      );
  })

  
export default ProgramProjectPlanSlider