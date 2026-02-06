import React from 'react';
import TransportTicketComponent from '@/src/components/modules/tickets/transport';
export var metadata = {
    title: "Transport Tickets - Agent Portal",
    description: "Agents Portal Tickets Page",
};
var TransportTicketsPage = function () {
    return (<div>
      <TransportTicketComponent />
    </div>);
};
export default TransportTicketsPage;
