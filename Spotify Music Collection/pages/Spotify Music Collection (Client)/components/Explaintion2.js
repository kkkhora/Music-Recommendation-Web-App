import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';

export default () => (
  <Popup trigger={<IconButton color="secondary"> <LibraryBooksIcon/></IconButton>} position="right center">
    <div>Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</div>
  </Popup>
  
);