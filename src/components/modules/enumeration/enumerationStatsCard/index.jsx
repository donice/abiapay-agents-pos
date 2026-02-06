"use client";
import React from "react";
// import "./style.scss" // Moved to _app;
import { fetchEnumerationData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/(secured)/loading";
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
var EnumerationStatsCard = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = useQuery({
        queryKey: ["enumerationStatsData"],
        queryFn: fetchEnumerationData,
    }), data = _j.data, isLoading = _j.isLoading, isError = _j.isError;
    if (isLoading) {
        return (<div className={"loading"}>
        <Loading />
      </div>);
    }
    if (isError) {
        return (<div>
        <p>Error</p>
      </div>);
    }
    return (<>
      {data ? (<figure className="identity-stats">
          <div className="identity-stats-card">
            <div className="ticket_container">
              <div className="identity-stats-card_balance">
                <span>Today&apos;s Enumeration</span>
                <span>{(((_b = (_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.thisDay) + ((_d = (_c = data === null || data === void 0 ? void 0 : data.response_data) === null || _c === void 0 ? void 0 : _c.market) === null || _d === void 0 ? void 0 : _d.thisDay)) || 0}</span>
              </div>

              <div className="identity-stats-card_image"></div>

              <div className="identity-stats-card_balance">
                <span>This Month&apos;s Enumeration</span>
                <span>{(((_f = (_e = data === null || data === void 0 ? void 0 : data.response_data) === null || _e === void 0 ? void 0 : _e.transport) === null || _f === void 0 ? void 0 : _f.thisMonth) + ((_h = (_g = data === null || data === void 0 ? void 0 : data.response_data) === null || _g === void 0 ? void 0 : _g.market) === null || _h === void 0 ? void 0 : _h.thisMonth)) || 0}</span>
              </div>
            </div>
          </div>
        </figure>) : (<LoaderSkeleton height="200px"/>)}
    </>);
};
export default EnumerationStatsCard;
