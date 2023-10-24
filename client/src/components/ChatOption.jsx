import React, { useEffect } from 'react';
import './css/ChatOption.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useStateContext from '../context/StateProvider';

function ChatOption(props) {

  const navigate = useNavigate();

  const [state,dispatch] = useStateContext();

  useEffect(()=>{
    dispatch({type:'EMPTY_CHATROOMDATA'});
  },[]);

  function getChatRoomId(user1Id,user2Id) {
    let ans='';
    if(user1Id < user2Id)
      ans=ans+user1Id+user2Id;
    else 
      ans=ans+user2Id+user1Id;
    return ans;
  };

  function handleChatClick() {
    const roomId = getChatRoomId(props.user1Id,props.user2Id);
    localStorage.setItem('sender',props.user1Id);
    localStorage.setItem('receiver',props.user2Id);
    localStorage.setItem('roomId',roomId);
    navigate('/chatRoom');
  };

  return (
    <div className='chatContainer limitWidth'>
      <div className='chat__img card__img'>
        <img alt='book Image' src={props.bookImg}/>
      </div>
      <div className='chat__info'>
        <div className='chat__bookTitle'>
          Book Title : {props.bookTitle}
        </div>
        <div className='chat__name'>
          {props.nameField} Name : {props.user2Name}
        </div>
        <div className='chat__institute'>
        {props.nameField} Institute : {props.user2Institute}
        </div>
        <Button onClick={handleChatClick} color='success' size='small' variant='contained'>CHAT</Button>
      </div>
    </div>
  )
}

export default ChatOption;