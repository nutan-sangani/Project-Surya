import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Button  from '@mui/material/Button'
import { TextField } from '@mui/material';
import useStateContext from '../context/StateProvider';
import Message from '../components/Message';
import axiosInstance from '../utils/axiosInstance';
import { toast_error } from '../utils/toastify';
import './css/ChatRoom.css';


const socket = io(process.env.REACT_APP_BACKEND_IP);

function ChatRooms() {

  const [state,dispatch] = useStateContext();
  const [typed,setTyped] = useState('');
  let roomId = localStorage.getItem('roomId');
  const sender = localStorage.getItem('sender');
  const receiver = localStorage.getItem('receiver');

  const [messages,setMessages] = useState(state.chatRoomData);

  socket.on('send message',(msg)=>{
    setMessages([...messages,msg]);
  });

  socket.on('reconnect', () => {
    socket.emit('join room',roomId);
  });

  useEffect(()=>{
    socket.emit('join room',roomId);
    axiosInstance.get('/chat/chatRoom?chatRoomId='+roomId)
                 .then((res) => {
                    if(res.data.success === 1)
                    {
                      dispatch({type:'ADD_MESSAGE_TO_CHATROOM',payload:res.data.data.messages});
                    }
                    else toast_error(res.data.message);
                 })
                 .catch((err) =>{
                  console.log(err);
                  toast_error(err);
                 });
    return () => { socket.disconnect();
    }
  },[]);
  
  function handleSendMsg() {
    socket.emit('send message',{msg:typed,sender:sender,receiver:receiver});
    setTyped('');
  };

  return (
    <div className='limitWidth' style={{maxWidth:'650px',width:'85%'}}>
      {messages.map((msg)=> {
        const user1=msg.from===sender ? 'user1':'';
        const className='messageContainer '+user1;
        return (
          <Message className={className} message={msg.message}/>
        )
      })}
      <input onChange={(event) => setTyped(event.target.value)} value={typed} className='chatRoom__input' placeholder='Type Message here'></input>
      <Button sx={{marginBottom:'16px'}} onClick={handleSendMsg} variant='contained' color='success' size='small'>
        Send
      </Button>
    </div>
  )
}

export default ChatRooms