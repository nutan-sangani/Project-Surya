import React, { useState } from 'react';
import Request from '../components/Request';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import useStateContext from '../context/StateProvider';
import { toast_success, toast_error } from '../utils/toastify';
import PaginationDiv from '../components/PaginationDiv';
import RequestMapper from '../utils/RequestMapper';
import Button from '@mui/material/Button';
import './css/BookRequests.css';
import ButtonGroup1 from '../components/ButtonGroup1';

function BookRequests() {

  const [state,dispatch]=useStateContext();

  const [page,setPage]=useState(1);
  const [maxPage,setMaxPage]=useState(1);

  const [section,setSection]=useState("PENDING");

  useEffect(()=>{
        //get all req for this book, store them in localstore and redirect to req page
        const bookId=localStorage.getItem('bookId');
        const query='/request/bookId?';
        const body={bookId:bookId,requestType:section,limit:10,page:page};
        axiosInstance.get(query,{params:body})
        .then((res)=>{
         if(res.data.success===1)
         {
          setMaxPage(res.data.data.totalPages)
          dispatch({type:'ADD_REQUEST_FOR_BOOK',payload:res.data.data});
         }
         else toast_error(res.data.message);
        })
        .catch((err)=>{
         console.log(err);
         toast_error(err)
        });
  },[page,section]);

  function handlePageChange(page) {
    setPage(page);
  };
  const userFeed=state.requestsForBookid;

  const buttonGroupClickHandler=function (name) {
    setSection(name);
  }

  return (
    <div className='home--container no--img limitWidth'>
      <p style={{width:'90%',maxWidth:'1024px', margin:'1rem auto', backgroundColor:'rgb(230, 188, 24)', padding:'1rem', fontWeight:'500'}}> Note : If you Reject a request, it will move to Rejected Requests section.
      Also if you accept a request, all the other requests will be moved to Rejected Requests section. All the new and unseen requests are present in the pending requests section 
      </p>
      <ButtonGroup1 
            buttonData = {[{text:"Pending Requests",name:"PENDING",changeFunction:buttonGroupClickHandler},
                          {text:"Accepted Requests",name:"ACCEPTED",changeFunction:buttonGroupClickHandler},
                          {text:"Rejected Requests",name:"REJECTED",changeFunction:buttonGroupClickHandler}]}
      />
        <PaginationDiv
          component={RequestMapper} 
          page={page} count={maxPage} 
          data={userFeed} classes='' 
          changeFn={handlePageChange} 
        />
    </div>
  )
};

export default BookRequests;

//default location will be pending requests, than can move to other requests.