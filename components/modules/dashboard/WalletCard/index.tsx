import React from 'react'
import "./style.scss"

const WalletCard = () => {
  return (
    <div className="wallet-card">
      <div className="wallet-card_balance">
        <span>Wallet Balance</span>
        <span>N120,000</span>
        <span>Wallet ID: 183308081803</span>
      </div>
      
      <div className="wallet-card_image">

      </div>

      <div className="wallet-card_earnings">
        <span>Current Earnings</span>
        <span>N30,000</span>
        <span>Total Collected: N19,220</span>
      </div>
      
    </div>
  )
}

export default WalletCard