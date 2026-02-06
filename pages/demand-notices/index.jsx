import DemandNoticesComponent from "@/src/components/modules/demand-notices";
import Head from "next/head";
import React from "react";
var DemandNoticesPage = function () {
    return (<div>
            <Head>
                <title>Demand Notices - Agent Portal</title>
                <meta name="description" content="Manage demand notices"/>
            </Head>
            <DemandNoticesComponent />
        </div>);
};
export default DemandNoticesPage;
