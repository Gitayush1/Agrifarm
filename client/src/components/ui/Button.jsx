import React from 'react'
import './Button.css';
export const Button = ({onClick,type,children}) => {
  return (
    <button
    onClick={onClick}
    type={type}
    children={children}
    className='ui_button'
    ></button>
  )
}


