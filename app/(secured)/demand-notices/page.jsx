import React from 'react';
import DemandNoticesComponent from '@/src/components/modules/demand-notices';
export var metadata = {
    title: "Transport Tickets - Agent Portal",
    description: "Agents Portal Tickets Page",
};
var DemandNoticesPage = function () {
    return (<div>
      <DemandNoticesComponent />
    </div>);
};
export default DemandNoticesPage;
