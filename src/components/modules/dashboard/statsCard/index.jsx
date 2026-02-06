import React from "react";
// import "./style.scss" // Moved to _app;
import { TbTicket, TbCreditCard, TbFolders } from "react-icons/tb";
import { useRouter } from "next/router";
var StatsCard = function (_a) {
    var name = _a.name, amount = _a.amount, link = _a.link;
    var router = useRouter();
    return (<div className={name == "Tickets" ? "stats-card green" : "stats-card"} onClick={function () { return link ? router.push(link) : console.log(""); }}>
      <div className="stats-card_summ">
        <span>{name == "Tickets" ? (<TbTicket className="icon"/>) : name === "ABSSIN" ? (<TbCreditCard className="icon"/>) : (<TbFolders className="icon"/>)}</span>
        <span>{name}</span>
      </div>

      <div className="stats-card_amount">
        <span>{amount}</span>
      </div>
    </div>);
};
export default StatsCard;
