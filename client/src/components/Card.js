import React from 'react';
import './css/Card.css';
import DonorInfo from './DonorInfo.jsx';

function Card(props) {
  return (
    <div> 
      <div className='card--container'>
        <div className='card__title'>
          <h4>{props.book_title}</h4>
        </div>
        <div className='card__classInfo'>
          <p className='card_flex_item'>Class : {props.book_class}</p>
          <p className='card_flex_item'>Board : {props.book_board}</p> 
        </div>
        <div className='card__img'>
          <img src={props.book_img} />
        </div>
        <DonorInfo donor_name={props.donor.name} 
          donor_donated={props.donor.donated}
          donor_city={props.donor.city} />
        <div className="card__city">
          <p>{props.book_city}</p>
        </div>
        <button className='card__btn' type='submit'>
          Request Now
        </button>
      </div>
    </div>
  )
}

export default Card;

//things in a card.
//book title, class, which board (defualt would be NA), image, donated by (donor info ka component banasakte
// which includes name and donated till now, city), request button (to send a req for the book) 