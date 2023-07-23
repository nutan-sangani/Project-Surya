import React from 'react';
import './css/DonorInfo.css';

function DonorInfo(props) {
  return (
    <div className='donorInfo--container'>
        <div className='donor__name'>
            <p>Donated by : </p>
            <p> {props.donor_name ? props.donor_name : 'Request again'}</p>
        </div>
        <div className='donor__donated'>
            <p>Donated : </p>
            <p> {props.donor_donated ? props.donor_donated+' Books till now' : 'Go Back and'} </p>
        </div>
        <div className='donor__city'>
            <p>Donor Institute : </p>
            <p> {props.donor_institute ? props.donor_institute : 'request again'}</p>
        </div>
    </div>
  )
}

export default DonorInfo;