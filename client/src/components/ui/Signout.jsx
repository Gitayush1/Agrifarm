import React from 'react'
import './Signout.css'
import { FaArrowLeft } from "react-icons/fa";
import {useNavigate } from 'react-router-dom';
export const Signout = () => {

  return (
    <div  className="back_toLogin_ui">
        <FaArrowLeft/>
       <span>Sign Out</span>
        </div>
  )
}

