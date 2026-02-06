import GroupSportTicketsComponent from '@/src/components/modules/tickets/sport/group';
import React from 'react';
var GroupSportTicketsPage = function (_a) {
    var params = _a.params;
    var slug = params.slug;
    return (<div><GroupSportTicketsComponent category={slug}/></div>);
};
export default GroupSportTicketsPage;
