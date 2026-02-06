import MarketTicketsSummaryComponent from '@/src/components/modules/tickets/market/marketTicketSummary';
import React from 'react';
export var metadata = {
    title: "View Payment Summary",
    description: "Agents Portal Tickets Page",
};
var MarketTicketsSummaryPage = function () {
    return (<div>
      <MarketTicketsSummaryComponent />
    </div>);
};
export default MarketTicketsSummaryPage;
