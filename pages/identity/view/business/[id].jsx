import BusinessDynamicView from "@/src/components/modules/identity/view/business/BusinessDynamicView"; // Assuming this exists based on pattern
import { useRouter } from "next/router";
import React from "react";
var BusinessViewPage = function () {
    var router = useRouter();
    var id = router.query.id;
    if (!id)
        return null;
    return <BusinessDynamicView id={id}/>;
};
export default BusinessViewPage;
