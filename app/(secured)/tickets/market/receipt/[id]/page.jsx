import { GoBackButton } from '@/src/components/common/button';
import ViewReceiptComponent from '@/src/components/modules/tickets/market/receipt';
import React from 'react';
var ViewReceiptPage = function (_a) {
    var params = _a.params;
    return (<div>
      <GoBackButton />
      <ViewReceiptComponent id={params.id}/>
    </div>);
};
export default ViewReceiptPage;
