import React from 'react'
import Image from 'next/image'
import Logo from "../../assets/logo.svg"

export const AbiaLogo = () => {
  return (
    <div>
      <Image src={Logo} alt="Abiapay Agents Logo" width={100}/>
    </div>
  )
}
