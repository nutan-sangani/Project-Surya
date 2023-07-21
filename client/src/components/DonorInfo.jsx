import React from 'react';
import './css/DonorInfo.css';

function DonorInfo(props) {
  return (
    <div className='donorInfo--container'>
        <div className='donor__name'>
            <p>Donated by : </p>
            <p> {props.donor_name}</p>
        </div>
        <div className='donor__donated'>
            <p>Donated : </p>
            <p> {props.donor_donated} Books till now</p>
        </div>
        <div className='donor__city'>
            <p>Donor Institute : </p>
            <p> {props.donor_institute}</p>
        </div>
    </div>
  )
}

export default DonorInfo;