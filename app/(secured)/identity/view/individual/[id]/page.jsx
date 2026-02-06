import DyamicView from "@/src/components/modules/identity/view/individual/DyamicView";
import React from "react";
var page = function (_a) {
    var params = _a.params;
    var id = params.id;
    console.log(id);
    // console.log(params.id);
    return <DyamicView id={id}/>;
};
export default page;
