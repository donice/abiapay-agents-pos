import React from 'react'
import Image from 'next/image'
import Logo from "../../assets/logo.svg"
import LogoWhite from "../../assets/logo_white.svg"

export const AbiaLogo = () => {
  return (
    <div>
      <Image src={Logo} alt="Abiapay Agents Logo" width={100} loading='eager' priority={true}/>
    </div>
  )
}
export const AbiaLogoWhite = () => {
  return (
    <div>
      <Image src={LogoWhite} alt="Abiapay Agents Logo" width={100} loading='eager' priority={true}/>
    </div>
  )
}

export const AbiaLogoLarge = () => {
  return (
    <div>
      <Image src={Logo} alt="Abiapay Agents Logo" width={150} loading='eager' priority={true}/>
    </div>
  )
}
