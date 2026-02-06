import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import Link from "next/link";
import "./style.scss";
import { haulages } from "@/src/components/modules/tickets/transport/flying-revenue/lib/haulages";
export var metadata = {
    title: "Manage Ticket",
    description: "Agents Portal Tickets Page",
};
var TicketPage = function () {
    return (<div className="flying-revenue">
      <CustomHeader title="Flying Revenue" desc={"Manage your haulage items"}/>

      <div className="flying-revenue_container">

        <div className="flying-revenue_items">
          {haulages.map(function (item) { return (<Link href={"/".concat(item.name)} key={item.name} className={"flying-revenue_item"}>
              <div>
                {" "}
                <span>{item.icon}</span>
                <div>
                  <h2>{item.title}</h2>
                  {/* <p>{item.desc}</p> */}
                </div>
              </div>
            </Link>); })}
        </div>
      </div>
    </div>);
};
export default TicketPage;
