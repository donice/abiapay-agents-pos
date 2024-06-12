import React from 'react'
import type { Metadata } from "next";
import DashbaordComponent from '@/components/modules/dashboard';

export const metadata: Metadata = {
  title: "Agents Portal - Dashbaord",
  description: "Abia Pay for Agents Portal Dashboard",
};


const Dashboard = () => {
  return (
    <div>
      <DashbaordComponent/>
    </div>
  )
}

export default Dashboard