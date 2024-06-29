import React from 'react'
import "./style.scss"

const TicketsWalletCard = () => {
  return (
    <div className="tickets-wallet-card">
      <div className="tickets-wallet-card_balance">
        <span>Today's Collections</span>
        <span>N120,000</span>
      </div>
      
      <div className="tickets-wallet-card_image">

      </div>

      <div className="tickets-wallet-card_balance">
        <span>ePayments Today</span>
        <span>0 </span>
      </div>
      
    </div>
  )
}

export default TicketsWalletCard