import React from 'react'
import './css/Home.css';
import Button from '@mui/material/Button'
import Header from '../components/Header';
import Card from '../components/Card';
import home_bg from '../assets/home_bg_3.jpg';

function Home() {
  const donor={name:'NUTAN SANGAI',city:'Vasai',donated:2}
  return (
    <div>
        <Header/>
        <Button sx={{marginTop:'10%',fontWeight:'900'}} variant='contained' size='large' color='secondary'> DONATE NOW </Button>
        <div className='home__img'>
          <img className='home__bgImg' src={home_bg} alt="header image" />
        </div>
      <div className='home--container'>
        <Card book_title="12th Chemistry TextBook"
          book_class="12th science"
          book_board="NCERT"
          book_img="https://m.media-amazon.com/images/S/aplus-media/sota/9c7ddf71-eccb-4bdb-a062-6e9d7990436e.__CR0,0,300,300_PT0_SX300_V1___.jpg"
          book_city="Vasai"
          donor={donor}
         />
        <Card book_title="12th Chemistry TextBook"
          book_class="12th science"
          book_board="NCERT"
          book_img="https://m.media-amazon.com/images/I/51BzXo-7GXL._SX342_SY445_.jpg"
          book_city="Vasai"
          donor={donor}
         />
        <Card book_title="12th Chemistry TextBook"
          book_class="12th science"
          book_board="NCERT"
          book_img="https://m.media-amazon.com/images/S/aplus-media/sota/9c7ddf71-eccb-4bdb-a062-6e9d7990436e.__CR0,0,300,300_PT0_SX300_V1___.jpg"
          book_city="Vasai"
          donor={donor}
         />
        <Card book_title="12th Chemistry TextBook"
          book_class="12th science"
          book_board="NCERT"
          book_img="https://m.media-amazon.com/images/S/aplus-media/sota/9c7ddf71-eccb-4bdb-a062-6e9d7990436e.__CR0,0,300,300_PT0_SX300_V1___.jpg"
          book_city="Vasai"
          donor={donor}
         />
      </div>
    </div>
  )
};

export default Home;