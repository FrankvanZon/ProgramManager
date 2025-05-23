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
  combinedValue: number[];
  setCombinedValue : (value: number[]) => void;
}

const ProgramProjectPlanSlider = observer(function ProgramProjectPlanSlider({ expandPlan, phase, project, combinedValue, setCombinedValue }: Props) {
  const { id } = useParams();
  const { editProjectPhase } = useProjects(id);
  const { yearStore } = useStore();
  const [value, setValue] = useState<number[]>([0, 11]);

  const getProjectPhase = (phaseName: string) => {
    const phase = project.phases.find(p => p.phase === phaseName);
    return phase;
  };

  const projectPhase: ProjectPhase = getProjectPhase(phase) as ProjectPhase;

  const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const handleCommit = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);

      projectPhase.startQuarter = (projectPhase.startQuarter === 0 || yearStore.InverseQuarter(projectPhase.startQuarter) >= 0) ?
        yearStore.Quarter(newValue[0]) : projectPhase.startQuarter;
      projectPhase.finishQuarter = (projectPhase.finishQuarter === 0 || yearStore.InverseQuarter(projectPhase.finishQuarter) <= 11) ?
        yearStore.Quarter(newValue[1]) : projectPhase.finishQuarter;

      editProjectPhase.mutate(projectPhase);

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

    }
  };

  // Render the individual phases
  useEffect(() => {
    if (projectPhase) {
      const start = Math.max(0, yearStore.InverseQuarter(projectPhase.startQuarter));
      const end = Math.min(11, yearStore.InverseQuarter(projectPhase.finishQuarter));
      setValue([start, end]);
    } else {
      const start = 4;
      const end = 4;
      setValue([start, end]);
    }
  }, [phase, projectPhase, yearStore, yearStore.Year, expandPlan]);

  const phaseColors: Record<Props['phase'], "success" | "warning" | "info" | "primary" | "error" | "secondary"> = {
    'NPDL': 'success',
    'APC': 'primary',
    'VPC': 'warning',
    'CIB': 'secondary',
    'Combined': 'success'
  };

  return (
    <Box display={'flex'}>
      <Box sx={{ width: 25 }}>
      </Box>
      <Box sx={{ width: 600 }}>
        <Slider
          getAriaLabel={() => 'Year-Quarter range'}
          value={phase === 'Combined'
                  ? combinedValue
                  : value}
          onChange={handleChange}
          onChangeCommitted={handleCommit}
          disabled={phase === 'Combined'}
          valueLabelDisplay="off"
          min={0}
          max={11}
          color={phaseColors[phase] || 'primary'}
          marks={Array.from({ length: 12 }, (_, index) => ({
            value: index,
            label: (expandPlan && phase === 'Combined') ? yearStore.Quarter(index) : '',
          }))}
        />
      </Box>
    </Box>
  );
});

export default ProgramProjectPlanSlider;
