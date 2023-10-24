import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import DonateBook from './pages/DonateBook';
import { ToastContainer } from 'react-toastify';
import SearchResults from './pages/SearchResults';
import Requests from './pages/Requests';
import Header from './components/Header';
import UserBooks from './pages/UserBook';
import BookRequests from './pages/BookRequests';
import UserRequests from './pages/UserRequests';
import Chat from './pages/Chat';
import ChatRoom from './pages/ChatRooms';


function App() {
  return (
    <div className='App'>
    <ToastContainer />
        <Router>
          <Routes>
            <Route path='/'
              element={<Home/>}
              />
            <Route path='/login' 
              element={<Login button_text="LOGIN" signup=""/>}
              />
            <Route path='/register'
              element={<Login button_text="CREATE MY ACCOUNT" signup="1"/>}
              />
            <Route path='/DonateBook' 
              element={<DonateBook/>}
            />
            <Route path='/searchResults'
              element = {<SearchResults/>}
            />
            <Route path='/request'
              element = {<Requests/>}
            />
            <Route path='/userBook'
              element = {<div>
                          <Header/>
                          <UserBooks />
                         </div>}
            />
            <Route path='/bookRequest'
              element = {<div>
                          <Header/>
                          <BookRequests />
                         </div>}
            />
            <Route path='/userRequest'
              element={
              <div>
                <Header/>
                <UserRequests/>
              </div>}
            />
            <Route path='/Userchats'
              element={
                <div>
                  <Header/>
                  <Chat/>
                </div>
              }
            />
            <Route path='/chatRoom'
              element={
                <div>
                  <Header/>
                  <ChatRoom/>
                </div>
              }
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

//apply validation on userName in login and book name in donateBook page
