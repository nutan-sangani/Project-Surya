import React, { useEffect, useState } from 'react';
import useStateContext from '../context/StateProvider';
import axiosInstance from '../utils/axiosInstance';
import { toast_error } from '../utils/toastify';
import setDonor from '../utils/setDonor';
import PaginationDiv from '../components/PaginationDiv';
import CardMapper from '../utils/CardMapper';

function UserBook() {
  const [state,dispatch] = useStateContext();
  const [page,setPage] = useState(1);

  useEffect(()=>{
    const query='/book/userBooks?limit=10&page='+page;
    axiosInstance.get(query)
                 .then((res) => {
                    if(res.data.success===1)
                    {
                      console.log(res.data.data.results);
                        res.data.data.results = setDonor(res.data.data.results); 
                        dispatch({type:'ADD_USER_DONATED_BOOKS',payload:res.data.data});
                        //this data we contains page no, total pages, as well as books data
                    }
                    else toast_error(res.data.message);
                 })
                .catch((err)=>console.log(err));
  },[page]);

  function changeHandler(page){
    setPage(page);
  }

  function deleteBook(bookId){
    
  }

  return (
    <div>
      <PaginationDiv btn_text='Delete Book Donation' 
      component={CardMapper} page={page} 
      btn_fn={deleteBook}
      count={state.donated && state.donated.totalPages} 
      changeFn={changeHandler} 
      data={state.donated.results} 
      classes='home--container no--img'  />
    </div>
  )
}

export default UserBook;