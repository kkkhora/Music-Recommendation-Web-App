import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo() {
  return (
    <Box sx={{ minWidth: 220, }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Search by
        </InputLabel>
        <NativeSelect
          defaultValue={60}
          inputProps={{
            name: 'Selecy by',
            id: 'uncontrolled-native',
          }}
        >
          <option value={20}>Song name</option>
          <option value={20}>Artist name</option>
        </NativeSelect>
        
      </FormControl>
    </Box>
  );
}
