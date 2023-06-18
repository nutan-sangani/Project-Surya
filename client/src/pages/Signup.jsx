import React, { useState } from 'react';
import './css/Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import login_img from '../assets/login_img.jpg';
import logo_img from '../assets/logo_img2.png';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';


function Signup() {
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 470,
        },
      },
    });
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    //error holds ' ' to show  no error or 'a' to show error
    const [emailError,setEmailError]=useState('');
    const [passError,setPassError]=useState('');
    const [mobileError,setMobileError]=useState('');
    //HT means helper text.
    const [emailHT,setEmailHT]=useState('');
    const [passHT,setPassHT]=useState('');
    const [mobileHT,setMobileHT]=useState('');
    //we wont be validating the name
    function handle(event,index)
    {
      if(index===1)
      {
        setName(event.target.value);
      }
      else if(index===2)
      {
        setEmail(event.target.value);
        let entered_value=event.target.value;
        let regMail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        if(entered_value.match(regMail))
        {
          setEmailError('');
          setEmailHT('');
        }
        else
        {
          setEmailError('a');
          setEmailHT(
            <>
              Please Enter a valid Email
            </>
          );
        }
      }
      else if(index===3)
      {
        setPassword(event.target.value);
        let entered_value=event.target.value;
        let regPass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(entered_value.match(regPass))
        {
          setPassError('');
          setPassHT('');
        }
        else
        {
          setPassError('a');
          setPassHT(
            <>
              Should contain 8-25 
              <br/>
              characters with atleast 1 
              <br/>
              alphanumeric character.
            </>
          );
        }
      }
      else if(index===4)
      {
        setMobile(event.target.value);
        let entered_value=event.target.value;
        let regMob=/^\d{10}$/;
        if(entered_value.match(regMob))
        {
          setMobileError('');
          setMobileHT('');
        }
        else
        {
          setMobileError('a');
          setMobileHT(
            <>
              Should Contain 10 digits only
            </>
          );
        }
      }
    };


  return (
    <div>
      <img src={login_img} className='login_img' />
      <div className='container'>
        <img src={logo_img} className='logo_img'/>
          <div className='form'>
              <h4>NAME</h4>
                <TextField variant='outlined' color="secondary" size='small'
                label='Name' placeholder='eg : Steve'
                value={name}
                onChange={(e)=> { handle(e,1); }}
                sx={{gridColumnStart:'2', width:'100%', fontSize:"10px"}}
                />
              <h4>EMAIL</h4> 
                <TextField variant='outlined' required="true" color="secondary" size='small' 
                error={emailError}
                value={email}
                helperText={emailHT}
                onChange={(e)=> { handle(e,2); }}
                inputProps={{style: {fontSize: '20'}}}
                label='Email' placeholder='example@gmail.com'
                />
              <h4>PASSWORD</h4>
                <TextField variant='outlined' required="true" color="secondary" type='password' size='small' 
                error={passError}
                value={password}
                helperText={passHT}
                onChange={(e)=> { handle(e,3); }}
                label='PassWord' placeholder='Password'/>
              <h4>MOBILE NO</h4>
                <TextField variant='outlined' required="true" color="secondary" size='small' 
                 error={mobileError}
                 value={mobile}
                 helperText={mobileHT}
                 onChange={(e)=> { handle(e,4); }}
                 label='Mobile Number' placeholder='eg : 9923456789'/>
          </div>
          <Button variant="contained" size='large' color="secondary"
          sx={{width:matches ? "97%" : "121%",marginTop:'40px',backgroundColor:'purple'}}>
            SIGN UP
          </Button>
      </div>
    </div>

  );
}

export default Signup;