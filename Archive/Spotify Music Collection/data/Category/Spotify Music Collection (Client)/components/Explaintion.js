import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';

export default () => (
  <Popup trigger={<IconButton color="secondary"> <LibraryBooksIcon/></IconButton>} position="right center">
    <div>A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</div>
  </Popup>
  
);