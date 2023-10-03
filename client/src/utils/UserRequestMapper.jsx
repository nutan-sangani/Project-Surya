import React from 'react';
import UserRequest from '../components/UserRequest';

function UserRequestMapper(props) {

  function findStatus(request)
  {
    if(request.isRejected) return "REJECTED";
    else if(request.isAccepted) return "ACCEPTED";
    else return "PENDING";
  }

  return (
    <div className={props.classes} >
        {props.userFeed && props.userFeed.map((request) => {
            return <UserRequest message={request.message} book_title={request.book.title}
                    book_class={request.book.course} book_board={request.book.board}
                    book_city={request.book.city} location={request.location}
                    book_img={request.book.img}
                    contact_info={request.contact_info}
                    status={findStatus(request)}
                />
        })}
    </div>
  )
}

export default UserRequestMapper