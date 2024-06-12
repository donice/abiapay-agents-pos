import React from 'react'
import WalletCard from './WalletCard'
import StatsCard from './statsCard'
import { TbTicket } from "react-icons/tb";
import "./style.scss"

const DashbaordComponent = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard_wallets'>
        <WalletCard />
        <WalletCard />
      </div>
      <div className='dashboard_stats'>
        <StatsCard name='Tickets' amount='30' />
        <StatsCard name='ABSSIN' amount='30' />
        <StatsCard name='Enumeration' amount='30' />
      </div>
    </div>
  )
}

export default DashbaordComponent;