import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Button  from '@mui/material/Button'
import { TextField } from '@mui/material';


const socket = io("http://localhost:5000");

function ChatRooms() {

  const [typed,setTyped] = useState('');
  const [roomId,setRoomId] = useState('64b7d5a4100cd33f29a3e1076534fbd67deba98b53ca0051');

  const [messages,setMessages] = useState(["Om ganshay namah","Hello from the server"]);

  socket.on('send message',(msg)=>{
    setMessages([...messages,msg]);
  });

  socket.on('reconnect', () => {
    socket.emit('join room',roomId);
  });

  useEffect(()=>{
    socket.emit('join room',roomId); //read this room id from localStorage.
  },[]);
  
  function handleSendMsg() {
    socket.emit('send message',{msg:typed,sender:'6534fbd67deba98b53ca0051',receiver:'65353b402cc20bb7bf6445a9'});
    setTyped('');
  };

  return (
    <div>
      {/* <div className='chat black' >
        <h4>Om ganshay namah</h4>
      </div> */}
      {messages.map((msg)=> {
        return (<div className='chat'>
          <h4>{msg}</h4>
        </div>)
      })}
      <TextField  value={typed} onChange={(event)=> setTyped(event.target.value)}>Write here</TextField>
      <Button onClick={handleSendMsg} variant='contained' color='success'>
        Send Message
      </Button>
    </div>
  )
}

export default ChatRooms