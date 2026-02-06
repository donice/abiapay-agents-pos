import React from 'react';
import ReceiptsComponent from '@/src/components/modules/tickets/receipts';
export var metadata = {
    title: "Transport Tickets - Agent Portal",
    description: "Agents Portal Tickets Page",
};
var BillsPage = function () {
    return (<div>
      <ReceiptsComponent />
    </div>);
};
export default BillsPage;
