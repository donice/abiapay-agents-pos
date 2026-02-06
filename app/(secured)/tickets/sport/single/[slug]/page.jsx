import SingleSportTicketsComponent from '@/src/components/modules/tickets/sport/single';
import React from 'react';
var SingleSportTicketsPage = function (_a) {
    var params = _a.params;
    var slug = params.slug;
    return (<div><SingleSportTicketsComponent category={slug}/></div>);
};
export default SingleSportTicketsPage;
