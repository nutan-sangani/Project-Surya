import * as React from 'react';
import Button from '@mui/material/Button';
import './css/ButtonGroup1.css';

export default function ButtonGroup1(props) {

  return (
    <div className='button--group'>
      <Button sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{props.options[0]}</Button>
      <Button sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{props.options[1]}</Button>
      <Button sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{props.options[2]}</Button>
    </div>
  );
};