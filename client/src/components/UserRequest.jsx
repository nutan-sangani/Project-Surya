import React from 'react';
import './css/UserRequest.css';

function UserRequest(props) {

  return (
      <div className='card--container'>
        <div className='card__title'>
          <h4>{props.book_title}</h4>
        </div>
        <div className='card__classInfo'>
          <p className='card_flex_item'>Class : {props.book_class}</p> 
          <p className='card_flex_item'>Board : {props.book_board}</p> 
        </div>
        <div className='card__img'>
          <img src={props.book_img} alt='' />
        </div>
        <div className="card__city">
          <p>{props.book_city}</p>
        </div> 
        <div className='request--subsection'>
            <h4>Message</h4>
            <p>{props.message}</p>
        </div>
        <div className='request--subsection'>
            <h4>Status</h4>
            <p>{props.status}</p>
        </div>
        <div className='request--subsection'>
            <h4>Meetup Location</h4>
            <p>{props.location}</p>
        </div>
        <div className='request--subsection'>
            <h4>Contact Info</h4>
            <p>{props.contact_info}</p>
        </div>
      </div>
  )
}

export default UserRequest;

//we will want bookImg, status, message, city, location, contactInfo,
//bookName, course, board
