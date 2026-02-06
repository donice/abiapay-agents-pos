import React from 'react';
import AddTransportTicketComponent from '@/src/components/modules/tickets/transport/addTransportTicket';
export var metadata = {
    title: "Create Transport Ticket",
    description: "Agents Portal Tickets Page",
};
var AddTransportTicketPage = function () {
    return (<div>
      <AddTransportTicketComponent />
    </div>);
};
export default AddTransportTicketPage;
