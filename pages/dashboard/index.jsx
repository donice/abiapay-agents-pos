import React from "react";
import Head from "next/head";
import DashbaordComponent from "@/src/components/modules/dashboard";
import DashboardBanner from "@/src/components/modules/dashboard/banner";
var Dashboard = function () {
    return (<div>
            <Head>
                <title>Agents Portal - Dashbaord</title>
                <meta name="description" content="Abia Pay for Agents Portal Dashboard"/>
            </Head>
            <DashbaordComponent />
            <DashboardBanner />
        </div>);
};
export default Dashboard;
