import React from "react";
import "./style.scss";
import { TbTicket, TbCreditCard, TbCopyCheck } from "react-icons/tb";

interface props {
  icon?: string;
  name: string;
  amount: string;
}
const StatsCard = ({ name, amount }: props) => {
  return (
    <div className="stats-card">
      <div className="stats-card_summ">
        <span>{
          name == "Tickets" ? (
            <TbTicket className="icon"/>
          ) : name === "ABSSIN" ? (
            <TbCreditCard className="icon"/>
          ) : (
            <TbCopyCheck className="icon"/>
          )
        }</span>
        <span>{name}</span>
      </div>

      <div className="stats-card_image"></div>

      <div className="stats-card_amount">
        <span>{amount}</span>
      </div>
    </div>
  );
};

export default StatsCard;
