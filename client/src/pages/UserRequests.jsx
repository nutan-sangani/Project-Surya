import React, { useEffect, useState } from 'react';
import useStateContext from '../context/StateProvider';
import axiosInstance from '../utils/axiosInstance';
import { toast_error } from '../utils/toastify';
import ButtonGroup1 from '../components/ButtonGroup1';
import PaginationDiv from '../components/PaginationDiv';
import UserRequest from '../components/UserRequest';
import UserRequestMapper from '../utils/UserRequestMapper';

function UserRequests() {
 
  const [state,dispatch] = useStateContext();
  const [page,setPage] = useState(1);
  const [maxPage,setMaxPage] = useState(1);

  const [section,setSection] = useState("PENDING");

  useEffect(()=>{
    axiosInstance.get('/user/requests',{params:{page:page,limit:10,requestType:section}})
                 .then((res)=>
                 {
                    if(res.data.success===1)
                    {
                        setMaxPage(res.data.data.totalPages);
                        dispatch({type:"ADD_USER_REQUESTS",payload:res.data.data});
                    }
                    else toast_error(res.data.message);
                 })
                 .catch((err) => {
                    console.log(err);
                    toast_error(err.message);
                 });
  },[page,section]);

  function buttonGroupClickHandler(name)
  {
    setSection(name);
  }

  function handlePageChange(page)
  {
    setPage(page);
  }

  let userRequests = state.requests;

  return (
    <div className='home--container no--img'>
        <p style={{width:'90%',maxWidth:'1024px', margin:'1rem auto', backgroundColor:'rgb(230, 188, 24)', padding:'1rem', fontWeight:'500'}}>If your request for a book is accepted, the donor may contact you on your means of 
        communication provided in the request, so keep checking it. There is also a chance that the donor may not contact, so 
        prepare for the worst and hope for the best</p>
        <ButtonGroup1 
            buttonData = {[{text:"Pending Requests",name:"PENDING",changeFunction:buttonGroupClickHandler},
                          {text:"Accepted Requests",name:"ACCEPTED",changeFunction:buttonGroupClickHandler},
                          {text:"Rejected Requests",name:"REJECTED",changeFunction:buttonGroupClickHandler}]}
        />
        <PaginationDiv 
            data={userRequests}
            page={page}
            count={maxPage}
            changeFn={handlePageChange}
            classes='home--container no--img'
            component={UserRequestMapper}
        />
    </div>
  );
}

export default UserRequests;