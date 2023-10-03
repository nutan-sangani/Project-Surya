import React from 'react';
import './css/FloatiingOptions.css';
import { Link } from 'react-router-dom';
import useStateContext from '../context/StateProvider';

function FloatingOptions() {

  const [state,dispatch] = useStateContext();

  return (
    <div className='FloatingOptions--container'>
        <Link className='OptionsLink' to='/userBook'>
            Your Donated Books
        </Link>
        <Link className='OptionsLink' to='/userRequest'>
            Your Requests
        </Link>
        <Link className='OptionsLink' to='/DonateBook'>
            Donate A Book
        </Link>
        <Link className='OptionsLink' to='/'>
            Home
        </Link>
        {state.curr_request.book_id && <Link className='OptionsLink' to='/request'>
            Request Last Visited Book
        </Link>}
    </div>
  )
}

export default FloatingOptions;