import BusinessDynamicView from "@/src/components/modules/identity/view/business/BusinessDynamicView"; // Assuming this exists based on pattern
import { useRouter } from "next/router";
import React from "react";

const BusinessViewPage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return <BusinessDynamicView id={id as string} />;
};

export default BusinessViewPage;
