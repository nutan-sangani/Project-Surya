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
    requestsForBookid:[],
    requests:[],
    chats:[],
    chatRoomData:[],
};

export const reducer = (state,action) =>{
    switch(action.type)
    {
        case 'ADD_USER' :
            const user = {
                username:action.payload.username,
                donated : action.payload.donated,
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
            // console.log(action.payload);
            state.searchResults = results;
            return {
                ...state,
            };
        case 'ADD_USER_REQUEST' :
            const request = action.payload;
            localStorage.setItem('request',JSON.stringify(request));
            state.curr_request = request;
            console.log(state.curr_request);
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
            return {
                ...state,
            }
        case "ADD_USER_REQUESTS" : 
            const d1=action.payload.results;
            state.requests=d1;
            return {
                ...state,
            }
        case 'ADD_USER_CHATS' :
            const arr = action.payload;
            let ans = [];
            arr && arr.forEach((chat) => {
                const username = chat.receiver ? chat.receiver.username : chat.donor.username;
                const institute = chat.receiver ? chat.receiver.institute : chat.donor.institute;
                const title = chat.book ? chat.book.title : chat.title;
                const img = chat.book ? chat.book.img : chat.img;
                const user2Id = chat.receiver ? chat.receiver._id : chat.donor._id;
                const user1Id= chat.receiver ? chat.donor : chat.sender;
                const obj = {
                    bookTitle:title,
                    user2Name:username,
                    user2Institute : institute,
                    bookImg:img,
                    user1Id:user1Id,
                    user2Id:user2Id,
                };
                ans.push(obj);
            });
            state.chats=ans;
            return {
                ...state,
            }
        case 'ADD_MESSAGE_TO_CHATROOM' : 
            const messages = action.payload;
            let op = state.chatRoomData;
            messages.forEach((message) => {
                const from = message.from;
                const msg = message.message;
                const obj = {
                    from:from,
                    message:msg,
                };
                op.push(obj);
            });
            state.chatRoomData = op;
            console.log(state.chatRoomData);
            return {
                ...state,
            }
        case 'EMPTY_CHATROOMDATA':
            state.chatRoomData = [];
            return{
                ...state,
            }
        default :
            alert("default");
    }
};