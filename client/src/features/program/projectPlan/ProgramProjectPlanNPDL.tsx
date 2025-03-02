import { Box, Slider, Typography } from '@mui/material';
import * as React from 'react';


const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

function valuetext(value: number) {
  const startYear = 25; // You can change this to the desired start year
  const year = startYear + Math.floor(value / 4);
  const quarter = quarters[value % 4];
  return `${year}${quarter}`;
}




export default function ProgramProjectPlanSliderNPDL() {
  const [value, setValue] = React.useState<number[]>([0, 11]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box display={'flex'}>
      <Box sx={{width: 100 }}>
        <Typography mt={0.5} variant='subtitle2'>NPDL</Typography>
      </Box>
      <Box sx={{width: 600 }}>
        
        <Slider
          getAriaLabel={() => 'Year-Quarter range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          min={0}
          max={11}
          color='success'
          marks={Array.from({ length: 12 }, (_, index) => ({
            value: index,
          //label: valuetext(index),
          }))}
        />
      </Box>
    </Box>
    );
}