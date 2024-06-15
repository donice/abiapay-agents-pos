import React from 'react'
import SigninForm from './form'
import CustomHeader from '../../common/header'


const SigninComponent = () => {
  return (
    <div>
      <CustomHeader title="Signin" desc="Manage/Create Transaction"/> 
      <SigninForm/></div>
  )
}

export default SigninComponent