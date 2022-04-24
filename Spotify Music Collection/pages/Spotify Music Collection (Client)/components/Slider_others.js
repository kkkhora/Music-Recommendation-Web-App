import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider(props) {
  const {value,setvalue,filed} = props
  // const [value, setValue] = React.useState([0, 1]);

  const handleChange = (e, newValue) => {
    setvalue(filed,newValue);
  };

  return (
    <Box sx={{
        width: 800,
        color: '#fff176',
        '& .MuiSlider-thumb': {
          borderRadius: '10px',
          backgroundColor: '#fff176',
        },
        
      }}
>
      <Slider
        getAriaLabel={() => 'Year range'}
        value={value[filed]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks
        min={0}
        max={1}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        color="secondary"
        step={0.05}
      />
    </Box>
  );
}
