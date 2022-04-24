import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';

export default () => (
  <Popup trigger={<IconButton color="secondary"> <LibraryBooksIcon/></IconButton>} position="right center">
    <div>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.</div>
  </Popup>
  
);