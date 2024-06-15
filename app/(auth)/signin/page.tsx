import SigninComponent from '@/src/components/modules/sigin';
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Sigin to Agents Portal",
  description: "Abia Pay for Agents Portal Dashboard",
};

const SignInPage = () => {
  return (
    <div>
      <SigninComponent />
    </div>
  )
}

export default SignInPage