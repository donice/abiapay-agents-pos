import DyamicView from "@/src/components/modules/identity/view/individual/DyamicView";
import { useRouter } from "next/router";
import React from "react";
var IndividualViewPage = function () {
    var router = useRouter();
    var id = router.query.id;
    if (!id)
        return null;
    return <DyamicView id={id}/>;
};
export default IndividualViewPage;
