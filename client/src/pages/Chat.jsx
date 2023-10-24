import React, {useState, useEffect} from 'react';
import ButtonGroup1 from '../components/ButtonGroup1';
import axiosInstance from '../utils/axiosInstance';
import { toast_error } from '../utils/toastify';
import useStateContext from '../context/StateProvider';
import ChatOption from '../components/ChatOption';

function Chat() {
  const [state,dispatch]=useStateContext();
  const [section,setSection]=useState("BOOKS");
  const [nameField,setNameField]=useState('Receiver');

  useEffect(()=>{
    const query='/chat';
    const body={pageTitle:section};
    axiosInstance.get(query,{params:body})
    .then((res)=>{
     if(res.data.success===1)
     {
        dispatch({type:'ADD_USER_CHATS',payload:res.data.data});
     }
     else toast_error(res.data.message);
    })
    .catch((err)=>{
        console.log(err);
        toast_error(err);
    });
},[section]);

  function handlePageChange(name) {
    if(name==='BOOKS')
    {
      setNameField('Receiver');
    }
    else setNameField('Donor');
    setSection(name);
  };

  return (
    <div>
        <ButtonGroup1
            buttonData={[{text:"Receivers of Your Book",name:"BOOKS",changeFunction:handlePageChange},
                         {text:"Your Requested Books", name:"REQUESTS",changeFunction:handlePageChange}]} />
        {state.chats[0] && state.chats.map((chat)=>{
          return <ChatOption nameField={nameField} user2Name={chat.user2Name.toUpperCase()} user2Institute={chat.user2Institute}
            bookImg={chat.bookImg} bookTitle={chat.bookTitle} user2Id={chat.user2Id} user1Id={chat.user1Id}
          />
        })}
    </div>
  )
}

export default Chat;

//not provided pagination, since currently backend makes complicated joins, etc on db,
//thus to make it paginated, models me change krna padega ya fhir koi aur solution dhundhna 
//padega
