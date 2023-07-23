import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './css/DonateBook.css';
import './css/Login.css';
import { Link } from 'react-router-dom';
import logo_img from "../assets/logo_img2.png";
import useStateContext from '../context/StateProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast_success, toast_error } from '../utils/toastify';

function DonateBook() {
    const [title,setTitle]=useState("");
    const [course,setCourse]=useState("");
    const [board,setBoard]=useState("");
    const [city,setCity]=useState("");
    const [img,setImg] = useState(null);
    const [src,setSrc]=useState(null);

    const navigate = useNavigate();

    const [state,dispatch] = useStateContext();

    useEffect(()=>{
        if(state.user.username==='')
        {
            axiosInstance.get('/user')
             .then((res)=>{
              if(res.data.success===1)
                dispatch({type:'ADD_USER',payload:res.data.data});
              else toast_error('Please Login to Donate Books');
             })
             .catch((err)=>console.log(err));
        }
    },[]);

    function uploadHandler(e){
        e.preventDefault();
        if(img===null)
        {
            toast_error("Insert a valid image to submit the form");
        }
        else{
            const formData = new FormData();
            formData.append('image',img);
            axiosInstance.post('/book/img', formData, {
                responseType: 'arraybuffer',
            })
                .then((response)=>{
                    console.log(typeof response.data);
                    const imageBuffer = response.data;
                    const base64Image = btoa(
                    new Uint8Array(imageBuffer).reduce(
                    (data, byte) => data + String.fromCharCode(byte),'')
                    );
                    const dataURL = `data:image/jpeg;base64,${base64Image}`;
                    setSrc(dataURL);
                })
                .catch((err)=>{
                    console.log(err);
                    toast_error("Please login. (if problem still persist contact admin)");
                });
        }
    };


    function changeHandler(event,index)
    {
        if(index==1)
        {
            setTitle(event.target.value);
        }
        else if(index==2)
        {
            setCourse(event.target.value);
        }
        else if(index==3)
        {
            setBoard(event.target.value);
        }
        else if(index==4)
        {
            setCity(event.target.value);
        }
    };

    function submitHandler(event){
        event.preventDefault();
        if(img===null)
        {
            toast_error("Insert a valid image to submit the form");
        }
        else{
            const formData = new FormData();
            formData.append('image',img);
            formData.append('title',title);
            formData.append('course',course);
            formData.append('board',board);
            formData.append('city',city);
            axiosInstance.post('/book',formData)
                         .then((res)=>{
                            if(res.data.success===1)
                            {
                                toast_success(res.data.message);
                                dispatch({type:'ADD_BOOK',payload:res.data.data}); //we are sending the objectid of the book added.
                                navigate('/');
                            }
                            else if(res.data.message.includes('ValidationError')) toast_error("Please fill all the Required fields");
                            else 
                            toast_error(res.data.msgCd);
                         })
                         .catch((err)=>console.log(err));
        }
    };

    function handleChange(event){
        const file=event.target.files[0];
        if(file && file.size>1024*1024)
        {
            toast_error("Upload image below 1MB size");
            setImg(null);
            return;
        }
        else if(file && file.size<=1024*1024)
        {
            setImg(file);
            return;
        }
    };

  return (
    <div className='signIn larger'>
        <Link to='/'>
          <img src={logo_img} className="logo_img smaller" />
        </Link>
        <form enctype='multipart/form-data' className='donate--form container form'>
        <h4>Book Title</h4>
        <TextField placeholder='eg :12th Science Chemistry 1 TextBook'
            name='book__title'
            onChange={(e)=>changeHandler(e,1)}
            required="true"
            label="Book Title"
            color='success'
            size='small'
            variant='outlined'
            value={title}
            sx={{gridColumnStart:2}}
        />
        <h4>Course studied using this Book</h4>
        <TextField placeholder='eg : 12th science'
            name='book__course'
            onChange={(e)=>changeHandler(e,2)}
            required="true"
            label="Book Course"
            size='small'
            color='success'
            variant='outlined'
            value={course}
            sx={{gridColumnStart:2}}
        />
        <h4>Board to which this book belongs</h4>
        <TextField placeholder='eg : Maharashtra Board'
            name='book__board'
            onChange={(e)=>changeHandler(e,3)}
            required="true"
            label="Board of study"
            size='small'
            color='success'
            variant='outlined'
            value={board}
            sx={{gridColumnStart:2}}
        />
        <h4>City where this book is Available</h4>
        <TextField placeholder='eg : Pune'
            name='book__city'
            onChange={(e)=>changeHandler(e,4)}
            required="true"
            color='success'
            label="City of Book"
            size='small'
            variant='outlined'
            value={city}
            sx={{gridColumnStart:2}}
        />
        </form>
        <p>Warning : Book needs to be handed over to the receiver, 
        both of you can decide mode of exchange by 
        contacting each other on email (your email will be visible 
        to the receiver, once you accept his request)</p>
        <div className='donate--form form container'>
            <h4>Book Image (less than 1MB size) </h4>
            <input style={{gridColumnStart:2, margin:'auto auto',width:'100%'}}
                required="true" type='file' accept="image/*" name='img' onChange={handleChange}/>
            <button className='upload__btn' onClick={uploadHandler} style={{gridColumnStart:4}}>Upload</button>
        </div>
        <p>Click on upload to check if the image is proper before submitting the form</p>
        <div className='donate--form form container'>
        { src && <img className='logo_img' style={{display:'block',margin:'auto auto',width:'70%'}} src={src} alt='if this image is not visible, click on upload again or refresh the page (or submit directly)'/> }
        <button className='upload__btn' style={{maxWidth:'300px',margin:'auto auto'}} type='submit' onClick={submitHandler}>Submit</button>
        </div>
    </div>
  )
}

export default DonateBook;

//have an upload button for image, after uploading show the image (after clicking on upload button)
