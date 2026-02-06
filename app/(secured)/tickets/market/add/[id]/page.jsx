import React from "react";
import MarketTicketDetailsComponent from "@/src/components/modules/tickets/market/details";
export var metadata = {
    title: "Create Market Ticket",
    description: "Agents Portal Tickets Page",
};
var MarketTicketDetailsPage = function (_a) {
    var params = _a.params;
    var id = params.id;
    return (<div>
      <MarketTicketDetailsComponent id={id}/>
    </div>);
};
export default MarketTicketDetailsPage;
