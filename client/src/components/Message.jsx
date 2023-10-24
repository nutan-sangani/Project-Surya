import React from 'react';
import './css/Message.css';

function Message(props) {
  return (
    <div className={props.className}>
        <p className='message__content'>{props.message}</p>
    </div>
  )
}

export default Message;