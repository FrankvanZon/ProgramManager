import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useProjects } from "../../../lib/hooks/useProjects";

interface Props {
  expandPlan: boolean;
  phase: 'NPDL' | 'APC' | 'VPC' | 'CIB' | 'Combined';
  project: Project;
}

const ProgramProjectPlanSlider = observer(function ProgramProjectPlanSlider({ expandPlan, phase, project }: Props) {
  const { id } = useParams();
  const { editProjectPhase } = useProjects(id);
  const { yearStore } = useStore();
  const [value, setValue] = React.useState<number[]>([0, 7]);
  const [phases, setPhases] = useState(project.phases);

  const getProjectPhase = (phaseName: string) => {
    const phase = project.phases.find(p => p.phase === phaseName);
    return phase;
  };

  const projectPhase: ProjectPhase = getProjectPhase(phase) as ProjectPhase

  const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };



  const handleCommit = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {


    //set to an actual quarter if it does not exist
    if (Array.isArray(newValue)) {
      setValue(newValue);

      projectPhase.startQuarter = (projectPhase.startQuarter == 0 || yearStore.InverseQuarter(projectPhase.startQuarter) >= 0) ?
        yearStore.Quarter(newValue[0]) : projectPhase.startQuarter;
      projectPhase.finishQuarter = (projectPhase.finishQuarter == 0 || yearStore.InverseQuarter(projectPhase.finishQuarter) <= 7) ?
        yearStore.Quarter(newValue[1]) : projectPhase.finishQuarter;

      editProjectPhase.mutate(projectPhase);
      setPhases([...phases]); // Trigger re-render
    }
  };



  useEffect(() => {
    if (phase === 'Combined') {
      const { startQuarter, finishQuarter } = phases
        .filter(phase => phase.required) // Filter phases where required is true
        .reduce((acc, curr) => {
          return {
            startQuarter: Math.min(acc.startQuarter, curr.startQuarter),
            finishQuarter: Math.max(acc.finishQuarter, curr.finishQuarter)
          };
        }, { startQuarter: 100000, finishQuarter: 0 });
      setValue([
        startQuarter == 100000 ? 0 : yearStore.InverseQuarter(startQuarter),
        yearStore.InverseQuarter(finishQuarter)]);
    } else if (projectPhase) {
      const start = Math.max(0, yearStore.InverseQuarter(projectPhase.startQuarter))
      const end = Math.min(7, yearStore.InverseQuarter(projectPhase.finishQuarter))
      setValue([start, end]);
    } else {
      const start = 0
      const end = 0
      setValue([start, end]);
    }
  }, [phase, phases, projectPhase, yearStore, yearStore.Year, expandPlan]);


  const phaseColors: Record<Props['phase'], "success" | "warning" | "info" | "primary" | "error" | "secondary"> = {
    'NPDL': 'success',
    'APC': 'primary',
    'VPC': 'warning',
    'CIB': 'secondary',
    'Combined': 'success'
  };

  return (
    <Box display={'flex'}>
      <Box sx={{ width: 50 }}>
      </Box>
      <Box sx={{ width: 600 }}>
        <Slider
          getAriaLabel={() => 'Year-Quarter range'}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleCommit}
          disabled={phase === 'Combined'}
          valueLabelDisplay="off"
          min={0}
          max={7}
          color={phaseColors[phase] || 'primary'}
          marks={Array.from({ length: 8 }, (_, index) => ({
            value: index,
            label: (expandPlan && phase === 'Combined') ? yearStore.Quarter(index) : '',
          }))}
        />
      </Box>
    </Box>
  );
})


export default ProgramProjectPlanSlider