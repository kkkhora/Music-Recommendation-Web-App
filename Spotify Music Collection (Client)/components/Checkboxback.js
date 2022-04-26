import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckboxes(props) {
  const {value,setvalue,filed} = props
  const handlecheck = (e) => {
    setvalue(filed,e.target.checked)
  }
 
  return (
    
      <Checkbox {...label} checked={value.happysad === filed} color="secondary" onChange={(e)=>handlecheck(e)} />
    
  );
}
