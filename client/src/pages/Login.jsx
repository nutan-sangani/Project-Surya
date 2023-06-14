import React, { useState } from 'react';
import './css/Login.css';

function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
  return (
    
    <div className='container'>
        <div className='form'>
            <h4>NAME</h4>
              <input type='text' name='name' value={name}/>
            <h4>EMAIL</h4> 
              <input type='email' name='email' value={email}/>
            <h4>PASSWORD</h4>
              <input type='password' name='password' value={password}/>
            <h4>MOBILE NO</h4>
              <input type='text' name='mobile' value={mobile}/>
        </div>
    </div>

  );
}

export default Login;