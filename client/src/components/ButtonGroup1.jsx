import * as React from 'react';
import Button from '@mui/material/Button';
import './css/ButtonGroup1.css';

export default function ButtonGroup1(props) {



  return (
    <div className='button--group'>
      <Button onClick={() => props.changeFunction(props.names[0])} sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{props.options[0]}</Button>
      <Button onClick={() => props.changeFunction(props.names[1])} sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{props.options[1]}</Button>
      <Button onClick={() => props.changeFunction(props.names[2])} sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{props.options[2]}</Button>
    </div>
  );
};