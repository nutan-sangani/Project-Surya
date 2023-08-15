import React, { useState } from 'react';
import Request from '../components/Request';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import useStateContext from '../context/StateProvider';
import { toast_success, toast_error } from '../utils/toastify';
import PaginationDiv from '../components/PaginationDiv';
import RequestMapper from '../utils/RequestMapper';
import { brown } from '@mui/material/colors';

function BookRequests() {

  const [state,dispatch]=useStateContext();

  const [page,setPage]=useState(1);
  const [maxPage,setMaxPage]=useState(1);

  useEffect(()=>{
        //get all req for this book, store them in localstore and redirect to req page
        const bookId=localStorage.getItem('bookId');
        const query='/request/bookId?limit=2&page='+page;
        axiosInstance.get(query,{params:{bookId:bookId}})
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
  },[page]);

  function handlePageChange(page) {
    setPage(page);
  };
  const userFeed=state.requestsForBookid;
  return (
    <div>
      <p style={{width:'90%',maxWidth:'1024px', margin:'1rem auto', backgroundColor:'rgb(230, 188, 24)', padding:'1rem', fontWeight:'500'}}> Note : If you Reject a request, it will be permanently deleted.
        And if you accept a request all the other requests will be permanently deleted.
        So choose wisely 
      </p>
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