import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { quarterToIndex } from '../../lib/util/util';

interface Props {
  project: Project;
  minQuarter: number;
  scaleFactor: number;
}

const ProjectRoadmapBar: React.FC<Props> = ({ project, minQuarter, scaleFactor }) => {
  const activityColors: { [key: string]: string } = {
    NPDL: '#4caf50',
    APC: '#2196f3',
    VPC: '#ff9800',
    CIB: '#756f6e',
  };

  const requiredPhases = project.phases
    .filter(phase => phase.required)
    .sort((a, b) => a.startQuarter - b.startQuarter); // Ensure order

  const leftMostQuarter = requiredPhases.length > 0 ? requiredPhases[0].startQuarter : undefined;

  // Determine the height of each phase based on the number of phases
  const phaseHeight = 25; // Divide height evenly for multiple phases

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column', // Stack phases vertically
        width: '100%',
      }}
    >
      {requiredPhases.map((phase, index) => {
        const start = (quarterToIndex(phase.startQuarter) - minQuarter) * scaleFactor;
        const width = (quarterToIndex(phase.finishQuarter) - quarterToIndex(phase.startQuarter) + 1) * scaleFactor;

        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              left: `${start}%`,
              width: `${width}%`,
              height: `${phaseHeight}px`, // Height of each phase
              backgroundColor: activityColors[phase.phase] || '#9e9e9e',
              borderRadius: '4px',
              padding: '0 8px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              fontSize: '0.875rem',
              overflow: 'hidden', // Prevent overflow inside the box
              marginBottom: '0px', // No spacing between phases
            }}
          >
            {/* Only show name on the leftmost phase */}
            {phase.startQuarter === leftMostQuarter ? (
              <Tooltip title={project.name} arrow>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {project.name}
                </Typography>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ProjectRoadmapBar;
