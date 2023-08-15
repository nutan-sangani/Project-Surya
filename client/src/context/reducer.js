import react from 'react';
export const initial_state = {
    user:{
        username:'',
        donated:0,
        requests:0,
        email:'',
        mobile:'',
    },
    searchResults :{},
    donated:{},
    curr_request:{},
    // bookId:'', i dont think that it is needed currently.
    requestsForBookid:[],
};

export const reducer = (state,action) =>{
    switch(action.type)
    {
        case 'ADD_USER' :
            const user = {
                username:action.payload.username,
                donated : action.payload.donated,
                // requests : action.payload.requests.length,
                email : action.payload.email,
                mobile : action.payload.mobile,
            };
            state.user=user;
            //have done such elaborate method, since the response from backend is mixed, we could have change the structure in the backend, but that would
            //change the response structure, also i dont know how to take selective things from an object in frontend. (thus ellaborate).
            return {
                ...state,
            };
        case 'ADD_BOOK' :
            state.user.donated = action.payload.donated;
            return {
                ...state,
            };


        case 'ADD_USER_SEARCH_RESULTS' :
            const results = action.payload;
            localStorage.setItem('searchResults',JSON.stringify(results));
            console.log(action.payload);
            state.searchResults = results;
            return {
                ...state,
            };
        case 'ADD_USER_REQUEST' :
            const request = action.payload;
            localStorage.setItem('request',JSON.stringify(request));
            state.curr_request = request;
            console.log(request);
            return {
                ...state,
            };
        
        case 'ADD_USER_DONATED_BOOKS' :
            const data = action.payload;
            state.donated = data;
            return {
                ...state,
            }
        case 'ADD_REQUEST_FOR_BOOK':
            const d=action.payload.results;
            state.requestsForBookid=d;
            console.log(state.requestsForBookid);
            return {
                ...state,
            }
        default :
            alert("default");
    }
};