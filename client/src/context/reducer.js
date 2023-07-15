import react from 'react';
import axios from 'axios';
export const initial_state = {
    user:null,
    requests : [],
    donated : [],
};

const axiosInstance = axios.create();
                    axiosInstance.interceptors.response.use(
                        (response) => response,
                        (error) => {
                            if(error.response.data.success===undefined) //if this is undefined, than server sent an error
                            {
                                return Promise.reject(error);
                            }
                            //else the server sent not an error,not response message (ie if has a message)
                            return Promise.resolve(error.response); //since we have done exceptional error handling, we display every message.
                        }
                      );

export const reducer = (state,action) =>{
    switch(action.type)
    {
        case 'GET_USER' :
            {
                let user;
                const token = localStorage.getItem('token');
                if(token)
                {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                    axiosInstance.get('/user')
                         .then((res) => {
                            if(res.data.success===1)
                            {
                                user=res.data.data;
                                console.log(user);
                            }
                            else
                            {
                                user=null;
                                console.log(res.data.message);  
                            } 
                         })
                         .catch((err) => 
                         {
                            console.log(err);
                         });
                }
                else user=null;
                state.user=user;
                return {
                    ...state
                }
            };
        default :
            alert("default");
    }
};