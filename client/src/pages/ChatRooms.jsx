import React from 'react';
import { io } from "socket.io-client";


const socket = io("http://localhost:5000");

function ChatRooms() {
    socket.emit('chat message', 'Hello, server!');
  return (
    <div>ChatRoomss</div>
  )
}

export default ChatRooms