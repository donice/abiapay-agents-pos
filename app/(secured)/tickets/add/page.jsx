import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import { FcShipped } from "react-icons/fc";
import Link from "next/link";
import "./style.scss";
import UsingPlateNumberExportComponent from "@/src/components/modules/find/using-plate-number/export_comp";
export var metadata = {
    title: "Create Ticket",
    description: "Agents Portal Add  Tickets Page",
};
var tickets = [
    {
        name: "tickets/transport/add",
        title: "Create Transport Tickets",
        desc: "Create transport ticket",
        icon: <FcShipped className="icon"/>,
    },
];
var AddTicketPage = function () {
    return (<div className="ticketspage">
      <CustomHeader title="Sharp Sharp" desc={"Add your tickets"}/>

      <div className="ticketspage_items">
        <UsingPlateNumberExportComponent />

        {tickets.map(function (item) { return (<Link href={"/".concat(item.name)} key={item.name} className={"ticketspage_item"}>
            <div>
              {" "}
              <span>{item.icon}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          </Link>); })}
      </div>
    </div>);
};
export default AddTicketPage;
