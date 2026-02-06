import React from 'react';
import TransportTicketsSummaryComponent from '@/src/components/modules/tickets/transport/tranportTicketSummary';
export var metadata = {
    title: "View Payment Summary",
    description: "Agents Portal Tickets Page",
};
var TransportTicketsSummaryPage = function () {
    return (<div>
      <TransportTicketsSummaryComponent />
    </div>);
};
export default TransportTicketsSummaryPage;
