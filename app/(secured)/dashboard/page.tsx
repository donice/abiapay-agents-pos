import React from 'react'
import type { Metadata } from "next";
import DashbaordComponent from '@/src/components/modules/dashboard';
import DashboardBanner from '@/src/components/modules/dashboard/banner';

export const metadata: Metadata = {
  title: "Agents Portal - Dashbaord",
  description: "Abia Pay for Agents Portal Dashboard",
};


const Dashboard = () => {
  return (
    <div>
      <DashboardBanner />
      <DashbaordComponent/>
    </div>
  )
}

export default Dashboard