"use client";
import React from "react";
import IndividualABSSINStatsCard from "./IndividualABSSINStatsCard";
import { useQuery } from "@tanstack/react-query";
import { getIndividualABSSINs } from "@/src/services/identityService";
import ViewAllIndividualABSSIN from "./ViewAllIndividualABSSIN";
import LargeLoader from "@/src/components/common/loader";
var ViewIndividualAbssinComponent = function () {
    var _a = useQuery({
        queryKey: ["ticketsWalletData"],
        queryFn: getIndividualABSSINs,
    }), data = _a.data, isLoading = _a.isLoading;
    return isLoading ? (<div>
      <LargeLoader />
    </div>) : (<div className="grid gap-4">
      <IndividualABSSINStatsCard data={data}/>
      <ViewAllIndividualABSSIN data={data}/>
    </div>);
};
export default ViewIndividualAbssinComponent;
