import React from 'react'
import './Backtologin.css'
import { FaArrowLeft } from "react-icons/fa";
import {useNavigate } from 'react-router-dom';
export const BackTOlogin = () => {
  const navigate =useNavigate();
  const navigateHandler =()=>{
    navigate('/login');
  }
  return (
    <div onClick={navigateHandler} className="back_toLogin_ui">
        <FaArrowLeft/>
       <span>Back to Login</span>
        </div>
  )
}

