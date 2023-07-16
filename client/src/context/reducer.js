import react from 'react';
import axios from 'axios';
export const initial_state = {
    user:{
        username:'',
        donated:0,
        requests:0,
        email:'',
        mobile:'',
    },
    requests : [],
    donated : [],
};

export const reducer = (state,action) =>{
    switch(action.type)
    {
        case 'ADD_USER' :
                return {
                    ...state,
                    user:action.payload,
                };
        default :
            alert("default");
    }
};