import React from 'react';
import Pagination  from '@mui/material/Pagination';
import './css/PaginationDiv.css';

function PaginationDiv(props) {

  const userFeed = props.data;

  function handleChange(event,page) {
    props.changeFn(page);
  }

  return (
    <div>
        <props.component btn_text={props.btn_text || ''}
          btn_fn={props.btn_fn || null} classes={props.classes} userFeed={userFeed} />
      <div className='pagination'>  
        <Pagination size='small' page={props.page} shape='rounded' onChange={(event,page)=>handleChange(event,page)} count={props.count} color='success'/>
      </div>
    </div>
  )
};

export default PaginationDiv;

//this will take as prop, the page no, route, and reducer function.
