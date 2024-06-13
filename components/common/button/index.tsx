"use client"
import React from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { useRouter } from 'next/navigation'
import "./style.scss"

interface prop {
  text: string;
  link: string;
}

export const PrimaryButton = ({text, link}: prop) => {
  const router = useRouter()

  const handleClick = (route: string) => {
    return router.push(route)
  }

  return (
    <button className='button primary' onClick={() => handleClick(link)}>
      <MdOutlineAdd className='icon' />
      {text}
    </button>
  )
}

export const SecondaryButton = ({text}: prop) => {
  const router = useRouter()
  return (
    <button className='button secondary'>
      <MdOutlineAdd className='icon' />
      {text}
    </button>
  )
}
