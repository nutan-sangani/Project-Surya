import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import login_img from "../assets/login_img3.png";
import logo_img from "../assets/logo_img4.png";
import useStateContext from "../context/StateProvider";
import axiosInstance from "../utils/axiosInstance";
import { toast_error, toast_success } from "../utils/toastify";


function Signup(props) {

  const [state,dispatch] = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [institute,setInstitute] = useState("");
  //error holds ' ' to show  no error or 'a' to show error
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [mobileError, setMobileError] = useState("");
  //HT means helper text.
  const [emailHT, setEmailHT] = useState("");
  const [passHT, setPassHT] = useState("");
  const [mobileHT, setMobileHT] = useState("");
  const navigate = useNavigate();
  //we wont be validating the name
  function handle(event, index) {
    if (index === 1) {
      setName(event.target.value);
    } 
    else if (index === 2) {
      setEmail(event.target.value);
      let entered_value = event.target.value;
      let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
      if (entered_value.match(regMail)) {
        setEmailError("");
        setEmailHT("");
      } else {
        setEmailError("a");
        setEmailHT(<>Please Enter a valid Email</>);
      }
    } 
    else if (index === 3) {
      setPassword(event.target.value);
      let entered_value = event.target.value;
      let regPass = /^(?=.*[a-z|A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,25}$/;
      if (entered_value.match(regPass)) {
        setPassError("");
        setPassHT("");
      } else {
        setPassError("a");
        setPassHT(
          <>
            Should contain 8-25
            <br />
            characters with atleast 1
            <br />
            alphanumeric character.
          </>
        );
      }
    } 
    else if (index === 4) {
      setMobile(event.target.value);
      let entered_value = event.target.value;
      let regMob = /^\d{10}$/;
      if (entered_value.match(regMob)) {
        setMobileError("");
        setMobileHT("");
      } else {
        setMobileError("a");
        setMobileHT(<>Should Contain 10 digits only</>);
      }
    }
    else if(index === 5){
      setInstitute(event.target.value);
    }
  };

  function redirectToSignUp(){
    navigate('/register');
  }

  function submitHandle(event) {
    event.preventDefault();
    let body = {};
    body.password = password;
    body.email = email;
    if(props.signup) //means register
    {
      body.username = name;
      body.mobile = mobile;
      body.institute = institute;
      axiosInstance.post('/auth/register',body)
                   .then((res)=>{
                    if(res.data.success === 1)
                    {
                      const token = 'Bearer '+res.data.data.token;
                      localStorage.setItem('token',token);
                      axiosInstance.defaults.headers.common["Authorization"] = token;
                      toast_success('Account Created Successfully');
                      navigate('/');
                    }
                    else toast_error(res.data.message);
                   })
                   .catch((err) => console.log(err));
    }
    else{
      axiosInstance.post('/auth/login',body)
                 .then((res) => {
                  if(res.data.success === 1)
                  {
                    const token = `Bearer ${res.data.data.token}`;
                    localStorage.setItem('token',token);
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                    toast_success('Successfully Logged in to Account');
                    navigate('/');
                  }
                  else toast_error(res.data.message);
                   })
                   .catch((err) => console.log(err));
    }
    
  }

  return (
    <div className="outter">
      <div className="img">
        <img src={login_img} className="login_img" />
      </div>
      <form className="signIn" onSubmit={submitHandle}>
        <Link to='/'>
          <img src={logo_img} className="logo_img" />
        </Link>
        <div className="container">
          <div className="form">
            {props.signup && <h4>NAME</h4>}
            {props.signup && (
              <TextField
                variant="outlined"
                color="success"
                size="small"
                value={name}
                sx={{ gridColumnStart: "2" }}
                onChange={(e) => {
                  handle(e, 1);
                }}
                label="Name"
                placeholder="eg : Steve"
                name="name"
              />
            )}
            {props.signup && <h4>INSTITUTE</h4>}
            {props.signup && (
              <TextField
                variant="outlined"
                color="success"
                size="small"
                value={institute}
                sx={{ gridColumnStart: "2" }}
                onChange={(e) => {
                  handle(e, 5);
                }}
                label="Institute"
                placeholder="eg : Ludhani Vidya Mandir"
                name="institute"
              />
            )}
            <h4>EMAIL</h4>
            <TextField
              variant="outlined"
              required="true"
              color="success"
              size="small"
              error={emailError}
              value={email}
              helperText={emailHT}
              sx={{ gridColumnStart: "2" }}
              onChange={(e) => {
                handle(e, 2);
              }}
              label="Email"
              placeholder="example@gmail.com"
              name="email"
            />
            <h4>PASSWORD</h4>
            <TextField
              variant="outlined"
              required="true"
              color="success"
              type="password"
              size="small"
              error={passError}
              value={password}
              helperText={passHT}
              sx={{ gridColumnStart: "2" }}
              onChange={(e) => {
                handle(e, 3);
              }}
              label="Password"
              placeholder="Password"
              name="password"
            />
            {props.signup && <h4>MOBILE NO</h4>}
            {props.signup && (
              <TextField
                variant="outlined"
                required="true"
                color="success"
                size="small"
                error={mobileError}
                value={mobile}
                helperText={mobileHT}
                sx={{ gridColumnStart: "2" }}
                onChange={(e) => {
                  handle(e, 4);
                }}
                label="Mobile Number"
                placeholder="eg : 9923456789"
                name="mobile"
              />
            )}
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="success"
          sx={{ width: "100%", marginTop: "3rem" }}
        >
          {props.button_text}
        </Button>
        {!props.signup && (
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={redirectToSignUp}
            sx={{ width: "100%", marginTop: "3rem" }}
          >
            DO NOT HAVE AN ACCOUNT ?{" "}
          </Button>
        )}
      </form>
    </div>
  );
}

export default Signup;
