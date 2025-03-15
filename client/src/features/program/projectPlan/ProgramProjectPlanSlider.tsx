import { Box, Slider } from "@mui/material";
import React, { useEffect } from "react";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useProjects } from "../../../lib/hooks/useProjects";

interface Props{
  expandPlan : boolean;
  phase: 'NPDL' | 'APC' | 'VPC' | 'CIB' | 'Combined';
  project : Project;
}

const ProgramProjectPlanSlider = observer( function ProgramProjectPlanSlider({expandPlan, phase, project} : Props) {
  const {id} = useParams();
  const {updateProject} = useProjects(id);
  const {yearStore} = useStore();
  const [value, setValue] = React.useState<number[]>([0, 7]);
 
  const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }};

  const handleCommit = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    let data: Project = { ...project }
    data = project;

    //set to an actual quarter if it does not exist
    if (Array.isArray(newValue)) {
      setValue(newValue);

      if (phase === 'NPDL') {
        data.startQuarter = (project.startQuarter == 0 || yearStore.InverseQuarter(project.startQuarter) >= 0) ?
          yearStore.Quarter(newValue[0]) : project.startQuarter;
        data.launchQuarter = (project.launchQuarter == 0 || yearStore.InverseQuarter(project.launchQuarter) <= 7) ?
          yearStore.Quarter(newValue[1]) : project.launchQuarter;

        updateProject.mutate(data);
      }
    }
  };



  useEffect(() => {
    if (phase === 'Combined') {
      const start = Math.max(0, yearStore.InverseQuarter(project.startQuarter))
      const end = Math.min(7, yearStore.InverseQuarter(project.launchQuarter))
      setValue([start, end]);

    } else if (phase === 'NPDL') {
      const start = Math.max(0, yearStore.InverseQuarter(project.startQuarter))
      const end = Math.min(7, yearStore.InverseQuarter(project.launchQuarter))
      setValue([start, end]);
    }
  }, [phase, project.startQuarter, project.launchQuarter, yearStore, yearStore.Year]);


  const phaseColors: Record<Props['phase'], "success" | "warning" | "info" | "primary" | "error" | "secondary" > = {
    'NPDL': 'success',
    'APC': 'primary',
    'VPC': 'warning',
    'CIB': 'secondary',
    'Combined': 'success'
  };

    return (
      <Box display={'flex'}>
        <Box sx={{width: 50 }}>
        </Box>
        <Box sx={{width: 600 }}>
          <Slider
            getAriaLabel={() => 'Year-Quarter range'}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleCommit}
            disabled={phase === 'Combined'}
            valueLabelDisplay="off"
            min={0}
            max={7}
            color={phaseColors[phase]  || 'primary'}
            marks={Array.from({ length: 8 }, (_, index) => ({
              value: index,
              label: (expandPlan && phase === 'Combined') ? yearStore.Quarter(index): '',
            }))}
          />
        </Box>
      </Box>
      );
  })

  
export default ProgramProjectPlanSlider