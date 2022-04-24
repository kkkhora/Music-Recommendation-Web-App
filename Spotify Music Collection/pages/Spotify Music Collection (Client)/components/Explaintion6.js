import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';

export default () => (
  <Popup trigger={<IconButton color="secondary"> <LibraryBooksIcon/></IconButton>} position="right center">
    <div>Tempo is the speed or pace of a given piece and derives directly from the average beat duration, shows the tempo of a track in beats per minute (BPM).</div>
  </Popup>
  
);