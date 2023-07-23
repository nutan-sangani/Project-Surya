import React from 'react';
import Header from '../components/Header';
import useStateContext from '../context/StateProvider';
import Card from '../components/Card';
import './css/SearchResults.css';

function SearchResults() {
  const [state,dispatch] = useStateContext();
  // const donor={name:'NUTAN SANGAI',city:'Vasai',donated:2};
  return (
    <div>
        <Header/>
        <div className='home--container no--img'>
          {state.searchResults.map((bookData) => {
            const  donor = {name:bookData.donor.username,
            institute:bookData.donor.institute,
            donated:bookData.donor.donated.length};
            return <Card book_title={bookData.title}
            book_class={bookData.course}
            book_board={bookData.board}
            book_img={bookData.img}
            book_city={bookData.city}
            donor={donor}
          />
          })}
      </div>
    </div>
  )
}

export default SearchResults