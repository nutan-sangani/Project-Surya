import react from 'react';
export const initial_state = {
    user:{
        username:'',
        donated:0,
        requests:0,
        email:'',
        mobile:'',
    },
    requests : {},
    donated : {},
    searchResults :{},
    curr_request:{},
};

export const reducer = (state,action) =>{
    switch(action.type)
    {
        case 'ADD_USER' :
            const user = {
                username:action.payload.username,
                donated : action.payload.donated.length,
                requests : action.payload.requests.length,
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
            const donated = action.payload.donated.length;
            state.user.donated = donated;
            state.donated.push(action.payload.donated);
            console.log(state);
            return {
                ...state,
            };


        case 'ADD_USER_SEARCH_RESULTS' :
            const results = action.payload;
            console.log(action.payload);
            state.searchResults = results;
            return {
                ...state,
            };
        case 'ADD_USER_REQUEST' :
            const request = action.payload;
            state.curr_request = request;
            console.log(request);
            return {
                ...state,
            };
        
        case 'ADD_USER_DONATED_BOOKS' :
            const data = action.payload;
            state.donated = data;
            console.log(state.donated);
            console.log(data);
            return {
                ...state,
            }
        
        default :
            alert("default");
    }
};