import React from 'react';
import {FaBars,FaRegUserCircle} from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';
import site_logo from '../assets/logo_img.png';
import useStateContext from '../context/StateProvider';

function Header() {
    const [state,dispatch] = useStateContext();
    const navigate = useNavigate();
    function login(){
        navigate('/login');
    };

  return (
    <div className='contain'>
        <div className='header'>
            <div className="header__options">
                <FaBars size={'24px'} color='white'/>
            </div>
            <div className="header__logo">
                <img  src={site_logo} alt="website logo" />
            </div>
            <div className="header__searchBar">
                <input  placeholder='  Search'/>
            </div>
            <div className="header__loginBtn">
                <Button variant='contained' size='small' color='secondary' onClick={login}
                    sx={{height:"28px",fontWeight:"900" ,color:"purple",backgroundColor:"white"}}>{state.user.username ?'LOGOUT' : 'LOGIN'} </Button>
            </div>
            <div className="header__profileBtn">
                <Link to='/profile'>
                    <FaRegUserCircle size={'32px'} color='white'/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header;
//things in header
//fabars(floating nagivation component) -> logo -> search_bar -> login_btn -> profile_btn
//below the headers there would be an img and a donate button there, 
//below which all the books, etc would appear. 

//search kiya to waha pe niche 10 results and redirect to next page, jaha 
//sirf results dikhe and search bar and profile_btn

//when size below a certain threshold, the search bar will come to a seperate row
//ngrok http --host-header=rewrite 3000