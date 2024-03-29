import React, { useEffect, useState } from 'react';
import {FaRegUserCircle} from 'react-icons/fa';
import {  FaXmark } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';
import site_logo from '../assets/logo_img.png';
import useStateContext from '../context/StateProvider';

import FoundItem from './FoundItem';
import axiosInstance from '../utils/axiosInstance'
import setDonor from '../utils/setDonor';
import { toast_error } from '../utils/toastify';
import FloatingOptions from './FloatingOptions';

function Header() {

    const [search,setSearch] = useState("");
    const [searchSection,setSearchSection] = useState(false);
    const [style,setStyle] = useState({});
    const [state,dispatch] = useStateContext();
    const [searchResults,setSearchResults] = useState([]);
    const [optionsToggle,setOptionsToggle] = useState(false);

    const controller = new AbortController();

    useEffect(()=>{
        const query = 'text='+ search+'&limit=10';
        axiosInstance.get('/book/search'+`?${query}`,{signal:controller.signal})
                     .then((res) => {
                        if(res.data.success === 1)
                        {
                            console.log(res.data.data.results);
                            const results = setDonor(res.data.data.results);
                            res.data.data.results=results;
                            res.data.data.query=query;
                            setSearchResults(res.data.data);
                        }})
                     .catch((err)=>console.log(err));

        return () => {controller.abort();
        console.log('aborted');}
    },[search]);

    useEffect(()=>{
        axiosInstance.get('/user')
             .then((res)=>{
              if(res.data.success===1)
                dispatch({type:'ADD_USER',payload:res.data.data});

              else toast_error(res.data.message) //configure this to use totastify alert.
             })
             .catch((err)=>console.log(err));

    },[]);

    function handleSearch(event) {
        setSearch(event.target.value);
        setSearchSection(true);
        setStyle({marginTop: 'auto',
            paddingTop: '10px'})
    };

    function closeSearch(){
        setStyle({});
        setSearch("");
        setSearchSection(false);
    }

    const navigate = useNavigate();
    function login(){
        navigate('/login');
    };

  return (
    <div className='contain'>
        <div className='header'>
            <div className="header__logo">
                <Link to='/' className='header__logo'>
                    <img  src={site_logo} alt="website logo" />
                </Link>
            </div>
            <div style={style} className="header__searchBar">
                <div className='header__cross'>
                    <input value={search} onChange={handleSearch} placeholder='  Search'/>
                    <FaXmark onClick={closeSearch}/>
                </div>
                
                {searchSection && <FoundItem result={searchResults}/>}
            </div>
            
            <div className="header__loginBtn">

                <Button variant='contained' size='small' color='common'  onClick={login}
                    sx={{height:"28px",fontWeight:"900",backgroundColor:'white',color:'green'}}>{state.user.username ?'LOGOUT' : 'LOGIN'} </Button>
            </div>
            <div className="header__profileBtn">
                    <FaRegUserCircle onClick={()=>setOptionsToggle(!optionsToggle)} size={'32px'} color='white'/>
                    {optionsToggle && <FloatingOptions />}
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