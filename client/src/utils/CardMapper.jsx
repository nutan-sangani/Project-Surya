import React from 'react';
import Card from '../components/Card';

function handle(data){
  alert(data);
}

function CardMapper(props) {
  return (
    <div className={props.classes}>
        {props.userFeed && props.userFeed.map((bookData) => {
          return <Card book_title={bookData.title}
          book_class={bookData.course}
          text={props.btn_text || ''}
          fn={props.btn_fn || null }
          book_id={bookData._id}
          book_board={bookData.board}
          book_img={bookData.img}
          book_city={bookData.city}
          donor={bookData.donor}
         />
        })}
    </div>
  )
}

export default CardMapper;