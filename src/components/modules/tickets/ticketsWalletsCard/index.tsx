import React from "react";
import "./style.scss";

const TicketsWalletCard = () => {
  return (
    <figure className="tickets-wallet">
      {" "}
      <div className="tickets-wallet-card">
        <div className="tickets-wallet-card_balance">
          <span>Today's Collections</span>
          <span>N120,000</span>
        </div>

        <div className="tickets-wallet-card_image"></div>

        <div className="tickets-wallet-card_balance">
          <span>ePayments Today</span>
          <span>0 </span>
        </div>
      </div>
      <div className="tickets-wallet-card">
        <div className="tickets-wallet-card_balance">
          <span>Today's Collections</span>
          <span>N120,000</span>
        </div>

        <div className="tickets-wallet-card_image"></div>

        <div className="tickets-wallet-card_balance">
          <span>ePayments Today</span>
          <span>0 </span>
        </div>
      </div>
    </figure>
  );
};

export default TicketsWalletCard;
