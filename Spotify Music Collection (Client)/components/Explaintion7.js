import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';

export default () => (
  <Popup trigger={<IconButton color="secondary"> <LibraryBooksIcon/></IconButton>} position="right center">
    <div>Which type of songs do you prefer: happy or sad or all. Click to select.</div>
  </Popup>
  
);