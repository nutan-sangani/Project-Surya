import React from 'react';
import Pagination  from '@mui/material/Pagination';
import Card from './Card';
import './css/PaginationDiv.css';

function PaginationDiv(props) {

  const userFeed = props.data;

  function handleChange(event,page) {
    props.changeFn(page);
  }

  return (
    <div>
      <div className={props.classes}>
        {userFeed && userFeed.map((bookData) => {
          return <props.component book_title={bookData.title}
          book_class={bookData.course}
          book_id={bookData._id}
          book_board={bookData.board}
          book_img={bookData.img}
          book_city={bookData.city}
          donor={bookData.donor}
         />
        })}
      </div>
      <div className='pagination'>  
        <Pagination size='small' page={props.page} shape='rounded' onChange={(event,page)=>handleChange(event,page)} count={props.count} color='success'/>
      </div>
    </div>
  )
}

export default PaginationDiv;

//this will take as prop, the page no, route, and reducer function.
