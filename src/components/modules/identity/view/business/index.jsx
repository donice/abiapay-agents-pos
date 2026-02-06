import { LargeLoader } from '@/src/components/common/loader';
import { getBusinessABSSINs } from '@/src/services/identityService';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import BusinessAbssinStatsCard from './BusinessAbssinStatsCard';
import ViewAllBusinessABSSIN from './ViewAllBusinessABSSIN';
var ViewBusinessAbssinComponent = function () {
    var _a = useQuery({
        queryKey: ["ticketsWalletData"],
        queryFn: getBusinessABSSINs,
    }), data = _a.data, isLoading = _a.isLoading;
    return isLoading ? (<div>
      <LargeLoader />
    </div>) : (<div className="grid gap-4">
      <BusinessAbssinStatsCard data={data}/>
      <ViewAllBusinessABSSIN data={data}/>
    </div>);
};
export default ViewBusinessAbssinComponent;
