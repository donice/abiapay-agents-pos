import AirtimeModule from "@/src/components/modules/(services)/airtime";
import Head from "next/head";
import React from "react";
var AirtimePage = function () {
    return (<div>
            <Head>
                <title>Airtime - Agent Portal</title>
                <meta name="description" content="Purchase airtime"/>
            </Head>
            <AirtimeModule />
        </div>);
};
export default AirtimePage;
