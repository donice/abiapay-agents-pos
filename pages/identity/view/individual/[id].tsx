import DyamicView from "@/src/components/modules/identity/view/individual/DyamicView";
import { useRouter } from "next/router";
import React from "react";

const IndividualViewPage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return null;

    return <DyamicView id={id as string} />;
};

export default IndividualViewPage;
