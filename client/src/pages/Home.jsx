import React, { useEffect, useState } from 'react'
import './css/Home.css';
import Button from '@mui/material/Button'
import Header from '../components/Header';
import Card from '../components/Card';
import home_bg from '../assets/home_bg_3.jpg';
import useStateContext from '../context/StateProvider';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { toast_error } from '../utils/toastify';

function Home() {
  // const donor={name:'NUTAN SANGAI',city:'Vasai',donated:2};
  const [userFeed,setUserFeed] = useState([]);

  const [state,dispatch] = useStateContext();
    useEffect(()=>{
        axiosInstance.get('/user')
             .then((res)=>{
              if(res.data.success===1)
                dispatch({type:'ADD_USER',payload:res.data.data});
              else toast_error(res.data.message) //configure this to use totastify alert.
             })
             .catch((err)=>console.log(err));
        axiosInstance.get('/book/?limit=15')
                     .then((res)=>{
                      //first we'll need to get the img url, than other things.
                      const results = res.data.results;
                      results.forEach((result)=>{
                        const donor = {};
                        donor.name=result.donor.username;
                        donor.institute=result.donor.institute;
                        donor.donated = result.donor.donated.length;
                        donor._id = result.donor._id;
                        console.log(donor);
                        result.donor = donor;
                      });
                      setUserFeed(results);
                     })
                     .catch((err) => console.log(err));
    },[]);
  
  return (
    <div>
        <Header />
        <Link to='/DonateBook'>
          <Button sx={{marginTop:'10%',fontWeight:'900'}} variant='contained' size='large' color='success'> DONATE NOW </Button>
        </Link>
        <div className='home__img'>
          <img className='home__bgImg' src={home_bg} alt=''/>
        </div>
      <div className='home--container'>
        {userFeed.map((bookData) => {
          return <Card book_title={bookData.title}
          book_class={bookData.course}
          book_id={bookData._id}
          book_board={bookData.board}
          book_img={bookData.img}
          book_city={bookData.city}
          donor={bookData.donor}
         />
        })}
      </div>
    </div>
  )
};

export default Home;
//making a seperate requests page, in future, will add a chat option to request page. 
//thought of making a floating request screen, but i think it would be too complicated.