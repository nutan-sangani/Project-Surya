import React from 'react';
import './css/FoundItem.css';
import { Link } from 'react-router-dom';
import useStateContext from '../context/StateProvider';

function FoundItem(props) {
  const [state, dispatch] = useStateContext();

  function handleClick(){
    console.log(props.result);
    dispatch({type:'ADD_USER_SEARCH_RESULTS',payload:props.result});
  }

  return (
    <div className='search--results'>
      { props.result.results.map((book)=>{
        return (
        <Link style={{textDecoration:'none',color:'black',fontWeight:'400'}} to='/searchResults'>
          <p onClick={handleClick}>{book.title }</p>
        </Link> );
      }) }
    </div>
  )
}

export default FoundItem;
//when a link is clicked, we will first add the current results to the reducer into the userSearch object and than move to searchResults page
//where we will show him all the results.