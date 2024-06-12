import React from 'react'
import { MdOutlineAdd } from "react-icons/md";
import "./style.scss"

interface prop {
  text: string;
}

export const PrimaryButton = ({text}: prop) => {
  return (
    <button className='button primary'>
      <MdOutlineAdd className='icon' />
      {text}
    </button>
  )
}

export const SecondaryButton = ({text}: prop) => {
  return (
    <button className='button secondary'>
      <MdOutlineAdd className='icon' />
      {text}
    </button>
  )
}
