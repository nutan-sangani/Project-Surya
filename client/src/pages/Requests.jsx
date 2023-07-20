import React from 'react';
import Card from '../components/Card';
import useStateContext from '../context/StateProvider';
import Header from '../components/Header';
import '../components/css/Header.css';

function Requests(props) {
    const [state,dispatch] = useStateContext();
    return (
        <div >
            <Header/>
            <div className='home--container no--img'>
                <Card 
                    book_title={state.curr_request.book_title}
                    book_class={state.curr_request.book_class}
                    book_board={state.curr_request.book_board}
                    book_img={state.curr_request.book_img}
                    book_city={state.curr_request.book_city}
                    donor={state.curr_request.donor}
                />
                <div className='request--info'>
                    <h1>hello there</h1>
                </div>
            </div>
        </div>
    )
}

export default Requests;
