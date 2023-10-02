import React from 'react';
import './css/Request.css';
import axiosInstance from '../utils/axiosInstance';
import { toast_error } from '../utils/toastify';

function Request(props) {

  function acceptHandler(event){
    event.preventDefault();
    const body={id:props._id,isAccepted:true};
    axiosInstance.patch('/request/status',body)//this req only for changing status, from accepted to rejected and vice-versa
                 .then((res)=>{
                    //will reject every other req, or make this accepted, and only show this now, with valid contact_info.
                    // cannot delete, all non accepted req, since that user may change his mind latter, or may not like that person, or the receiver ghost him, so we
                    //should give the option of accepting multiple requests.

                    //or we can make 3 pages, 1 for all requests (or pending requests), 1 for accepted and 1 for rejected requests.
                    //or better will be to have only 1 accepted, and 1 page for rejected and 1 page for pending.
                    //if 1 is accepted, than all present at that time will be rejected. 
                    //this also solves the problem, that receiver has already got the book and can communicate with the donor, and donor can accept another request. 
                    if(res.data.success===1)
                    {
                        dispatchEvent({type:'ADD_BOOK_REQUEST',payload:res.data.data}); 
                    }   
                    toast_error(res.data.message);
                 })
                 .catch((err)=>console.log(err));
  };

  function rejectHandler(event){
    event.preventDefault();
  }

  return (
    <div className='request--container' >
        <div className='requester--info'>
            <div className='requester--img'>
                <img src={props.proof} alt='if this image is not visible try refreshing the page' />
            </div>
            <div className='requester--data'>
                <div className="requester--item">
                    <h4 className='item--label'>Name  </h4>
                    <div className='item--data'>{props.name}</div>
                </div>
                <div className="requester--item">
                    <h4 className='item--label'>Institute </h4>
                    <div className='item--data'>{props.institute}</div>
                </div>
                <div className="requester--item">
                    <h4 className='item--label'>City  </h4>
                    <div className='item--data'>{props.city}</div>
                </div>
                <div className="requester--item">
                    <h4 className='item--label'>Message  </h4>
                    <div className='item--data'>{props.message}</div>
                </div>
                <div className="requester--item">
                    <h4 className='item--label'>Meeting Location  </h4>
                    <div className='item--data'>{props.location}</div>
                </div>
                <div className="requester--item">
                    <h4 className='item--label'>Contact Info  </h4> 
                    <div className='item--data'>{props.contact_info}</div>
                </div>
            </div>
        </div>
        <div className='requester--btn' >
            <button className='request--btn green' onClick={acceptHandler}>Accept Request</button>
            <button className='request--btn red' onClick={rejectHandler}>Reject Request</button>
        </div>
    </div>
  )
}

export default Request;
//we need to display here,
//book img, msg, name, institute, meeting location, city, (contact_info hidden till request is accepted)
//proof img, accept btn, reject btn.

//wont get contact info, till the req is not accepted.