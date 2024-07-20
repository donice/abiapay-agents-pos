import React from 'react'
import Dashboard from './(secured)/dashboard/page';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: "Agents Portal",
  description: "Abia Pay for Agents Portal Dashboard",
};

const Index = () => {
  return (
    <div><Dashboard /></div>
  )
}

export default Index;