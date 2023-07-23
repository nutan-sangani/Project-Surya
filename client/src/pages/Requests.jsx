import React from 'react';
import Card from '../components/Card';
import useStateContext from '../context/StateProvider';
import Header from '../components/Header';
import '../components/css/Header.css';
import { TextField } from '@mui/material';
import './css/Requests.css';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import  {toast_success, toast_error } from '../utils/toastify';
import { useNavigate } from 'react-router-dom';

function Requests(props) {
    const [state,dispatch] = useStateContext();
    
    const [msg,setMsg] = useState('');
    const [institute,setInsti] = useState('');
    const [contact_info,setContact] = useState('');
    const [location,setLocation] = useState('');
    const [city,setCity] = useState('');
    const [src,setSrc] = useState('');
    const [img,setImg] = useState(null);

    const navigate = useNavigate();

    function handleSend(event)
    {
        event.preventDefault();
        if(img===null)
            toast_error('Kindly upload a valid image of proof of size below 1MB');
        else{
            toast_success('Wait for 2 sec the request is being sent...');
            const formData = new FormData();
            formData.append('image',img);
            formData.append('message',msg);
            formData.append('institute',institute);
            formData.append('city',city);
            formData.append('location',location);
            formData.append('contact_info',contact_info);
            formData.append('book',state.curr_request.book_id);
            formData.append('donor',state.curr_request.donor._id);
            axiosInstance.post('/request/book',formData)
                        .then((res) => {
                            if(res.data.success===1)
                            {
                                toast_success('Book Requested Successfully');
                                navigate('/');
                            }
                            else toast_error(res.data.message);
                        })
                        .catch((err) => {
                            console.log(err);
                            toast_error(err);
                        });
        }
    };

    function handleFormChange(value,index){
        if(index===1) setMsg(value);
        else if(index===2) setInsti(value);
        else if(index===3) setContact(value);
        else if(index===4) setLocation(value);
        else if(index===5) setCity(value);
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

    return (
        <div >
            <Header/>
            <div className='home--container no--img limitWidth'>
                <Card 
                    book_title={state.curr_request.book_title}
                    book_class={state.curr_request.book_class}
                    book_board={state.curr_request.book_board}
                    book_img={state.curr_request.book_img}
                    book_city={state.curr_request.book_city}
                    donor={state.curr_request.donor ? state.curr_request.donor : ''}
                    button=' '
                />
                <form className='request--info' onSubmit={(e)=>handleSend(e)}>
                    <TextField size='small' color='success' 
                        label='Message'
                        multiline 
                        required
                        maxRows={3}
                        minRows={3}
                        placeholder='eg : I am your junior from ludhani vidya mandir, please accept it'
                        onChange={(e)=>handleFormChange(e.target.value,1)}  
                        value={msg}
                        sx={{marginLeft:'0px',justifyItems:'start'}}
                    />
                    <TextField size='small' label='Institute' 
                        color='success'
                        required
                        placeholder='eg : Ludhani Vidya Mandir'
                        onChange={(e)=>handleFormChange(e.target.value,2)} 
                        value={institute}  variant='outlined'
                    />
                    <TextField size='small' label='Contact Info (Optional)' color='success' 
                        multiline 
                        maxRows={2}
                        minRows={2} 
                        placeholder='eg : Email - abc@gmail.com 
                                          Insta - @nutan_sangani_'
                        onChange={(e)=>handleFormChange(e.target.value,3)}
                        value={contact_info}  variant='outlined'
                    />
                    <TextField size='small' label='Location for Meetup' color='success' 
                        multiline 
                        maxRows={2}
                        minRows={2}
                        placeholder='eg : abc mall or Waliv Talav or Abc Park'
                        onChange={(e)=>handleFormChange(e.target.value,4)} 
                        value={location}  variant='outlined'
                    />
                    <TextField size='small' label='City' color='success' 
                        value={city}
                        required
                        placeholder='eg : Vasai'
                        onChange={(e)=>handleFormChange(e.target.value,5)}  variant='outlined'
                    />
                    <button type='submit' className='button'>Submit</button>
                </form>
            </div>
                <div className='warning limitWidth'>
                    <p>Warnings and Instructions : </p>
                    <ol>
                        <li >While uploading your proof, upload something, which the donor can verify, like your latest school report card, marksheet, certificates or school id card</li>
                        <li>Do not share sensitive documents like adhar or pan card as proof, even while sharing your school/college id card, cover all the sensitive information like your roll no, phone no, address, etc </li>
                        <li>Do not share your address with the donor (he may be a risk)</li>
                        <li >Do not share your personal contact no here, untill you are sure about the donor (he may misuse it)</li>
                        <li>Its advised to share your professional email or social media handle (for privacy and safety purposes)</li>
                        <li>The contact info is optional, if you know the person, than you can directly confront him and ask him to accept your request</li>
                        <li>Since we cannot provide any logitical support at this time, you will need meet the donor to receive your books,so if you feel unsafe or suspicious of the donor, dont send him a request.</li>
                        <li>Whenever choosing the meeting location, choose a safe and fairly crowded space, do not meet anyone at remote places (he may be a risk)</li>
                        <li>Always have adult supervision, when going to receive the books (always go with your parents or gaurdians)</li>
                        <li>Please try to maintain as much precaution and as much adult supervision as possible, and in case of suspicious activity message the admin on instagram @nutan_sangani_</li>
                        <li>Disclaimer : This site is purely for educational purposes, but we cannot stop bad people from using it, so please remain safe and the admin, creator of this site, does not take any responsibility of any damage caused due to this site.</li>
                    </ol>
                </div>
                <div className='donate--form form container limitWidth proof--img'>
                    <h4>Proof Image (like report card, etc) (less than 1MB size) </h4>
                    <input style={{gridColumnStart:2, margin:'auto auto',width:'100%'}}
                        required="true" type='file' accept="image/*" name='img' onChange={handleChange}/>
                    <button className='button' onClick={uploadHandler} style={{gridColumnStart:4}}>Upload</button>
                </div>
                {src && <div className='donate--form form container limitWidth proof--img'>
                    <img className='logo_img' style={{display:'block',margin:'auto auto',width:'70%'}} src={src} alt='if this image is not visible, click on upload again or refresh the page (or submit directly)'/> 
                </div> }
        </div>
    )
}

export default Requests;
