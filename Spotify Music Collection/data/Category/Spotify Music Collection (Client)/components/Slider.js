import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider(props) {
  const { value,setValue } = props
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    console.log(value);
  }, [value])

  return (
    <Box sx={{
        width: 1100,
        color: '#fff176',
        '& .MuiSlider-thumb': {
          borderRadius: '10px',
          backgroundColor: '#fff176',
        },
        
      }}
>
      <Slider
        getAriaLabel={() => 'Year range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks
        min={1933}
        max={2021}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        color="secondary"
      />
    </Box>
  );
}
