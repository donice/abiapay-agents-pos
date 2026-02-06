import React from 'react';
import VeifyTicketStatusComponent from '@/src/components/modules/verify-ticket-status';
import { GoBackButton } from '@/src/components/common/button';
var VerifyTicket = function () {
    return (<>
   <GoBackButton />
    <VeifyTicketStatusComponent />
   </>);
};
export default VerifyTicket;
