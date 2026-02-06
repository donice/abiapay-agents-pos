import React from "react";
// import "./style.scss" // Moved to _app;
import { TbFolders, TbCash, TbReceipt } from "react-icons/tb";
import { useRouter } from "next/router";
var EnforcerCard = function (_a) {
    var name = _a.name, amount = _a.amount, link = _a.link;
    var router = useRouter();
    return (<div className={"enforcer-card"} onClick={function () { return (link ? router.push(link) : console.log("")); }}>
      <div className="enforcer-card_summ">
        <span>
          {name == "Bills" ? (<TbCash className="icon"/>) : name === "Receipts" ? (<TbReceipt className="icon"/>) : (<TbFolders className="icon"/>)}
        </span>
      </div>

      <div className="enforcer-card_amount">
        <p>Total {name}</p>
        <span>{amount} Items</span>
      </div>
    </div>);
};
export default EnforcerCard;
