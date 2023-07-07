import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import login_img from "../assets/login_img.jpg";
import logo_img from "../assets/logo_img2.png";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
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
    } else if (index === 2) {
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
    } else if (index === 3) {
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
    } else if (index === 4) {
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
  };

  function redirectToSignUp(){
    navigate('/register');
  }

  function submitHandle(event) {
    event.preventDefault();
    axios
      .post("/auth/register", {
        name: name,
        password: password,
        email: email,
        mobile: mobile,
      })
      .then((register_object) => {
        localStorage.setItem("token", `Bearer ${register_object.data.tokens}`);
        const tok = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = tok;
        axios
          .get("/auth/secret", {})
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        alert("done");
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="outter">
      <div className="img">
        <img src={login_img} className="login_img" />
      </div>
      <form className="signIn" onSubmit={submitHandle}>
        <img src={logo_img} className="logo_img" />
        <div className="container">
          <div className="form">
            {props.signup && <h4>NAME</h4>}
            {props.signup && (
              <TextField
                variant="outlined"
                color="secondary"
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
            <h4>EMAIL</h4>
            <TextField
              variant="outlined"
              required="true"
              color="secondary"
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
              color="secondary"
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
                color="secondary"
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
          color="secondary"
          sx={{ width: "100%", marginTop: "3rem" }}
        >
          {props.button_text}
        </Button>
        {!props.signup && (
          <Button
            variant="contained"
            size="large"
            color="secondary"
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
