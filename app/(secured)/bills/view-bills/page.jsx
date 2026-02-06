import { GoBackButton } from '@/src/components/common/button';
import BillsComponent from '@/src/components/modules/tickets/bills';
import React from 'react';
var ViewBills = function () {
    return (<div>
         <GoBackButton />
        <BillsComponent />
    </div>);
};
export default ViewBills;
