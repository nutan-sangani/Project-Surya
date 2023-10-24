import * as React from 'react';
import Button from '@mui/material/Button';
import './css/ButtonGroup1.css';

export default function ButtonGroup1(props) {
  return (
    <div className='button--group'>
      { props.buttonData && props.buttonData.map((button) =>{
        return <Button onClick={() => button.changeFunction(button.name)} sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' color='success' size='small'>{button.text}</Button>
      }) }
    </div>
  );
};