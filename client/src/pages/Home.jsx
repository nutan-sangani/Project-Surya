import React, { useEffect, useState } from 'react'
import './css/Home.css';
import Button from '@mui/material/Button'
import Header from '../components/Header';
import Card from '../components/Card';
import home_bg from '../assets/home_bg_3.jpg';
import useStateContext from '../context/StateProvider';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import setDonor from '../utils/setDonor';
import { toast_error } from '../utils/toastify';
import PaginationDiv from '../components/PaginationDiv';

function Home() {
  const [userFeed,setUserFeed] = useState([]);
  const [state,dispatch] = useStateContext();
  const [page,setPage] = useState(1);
  const [maxPage,setMaxPage] = useState(1);
    useEffect(()=>{
        axiosInstance.get('/user')
             .then((res)=>{
              if(res.data.success===1)
                dispatch({type:'ADD_USER',payload:res.data.data});

              else toast_error(res.data.message) //configure this to use totastify alert.
             })
             .catch((err)=>console.log(err));

    },[]);

    useEffect(()=>{
      const query='limit=10&page='+page;
      axiosInstance.get('/book/?'+query)
      .then((res)=>{
       if(res.data.success===1)
       {
         const results = setDonor(res.data.data.results);
         setPage(res.data.data.page);
         setMaxPage(res.data.data.totalPages);
         setUserFeed(results);
       }
       else toast_error(res.data.message);
      })
      .catch((err) => console.log(err));
    },[page]);

    function handlePageChange(page) {
      setPage(page);
    };
  
  return (
    <div>
      <Header />
      <Link to='/DonateBook'>
        <Button sx={{marginTop:'10%',fontWeight:'900'}} variant='contained' size='large' color='success'> DONATE NOW </Button>
      </Link>
      <div className='home__img'>
        <img className='home__bgImg' src={home_bg} alt=''/>
      </div>
      <PaginationDiv component={Card} page={page} count={maxPage} data={userFeed} classes='home--container' changeFn={handlePageChange} />
    </div>
  )
};

export default Home;
//making a seperate requests page, in future, will add a chat option to request page. 
//thought of making a floating request screen, but i think it would be too complicated.