import React from 'react';
import Request from '../components/Request';

function RequestMapper(props) {
    const userFeed=props.userFeed;
  return (
    <div className={props.classes}>
        {userFeed && userFeed.map((request) => {
            return <Request proof={request.proof} name={request.sender.username}
                institute={request.institute} city={request.city}
                location={request.location}
                contact_info={request.contact_info}
                message={request.message}
            />
        })
        }
    </div>
  );
};

export default RequestMapper;