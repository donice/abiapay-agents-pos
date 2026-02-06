"use client";
import React from "react";
// import "./style.scss" // Moved to _app;
import { useQuery } from "@tanstack/react-query";
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
import { fetchABSSINStats } from "@/src/services/identityService";
var IdentityStatsCard = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = useQuery({
        queryKey: ["ticketsWalletData"],
        queryFn: fetchABSSINStats,
    }), data = _j.data, isLoading = _j.isLoading, isError = _j.isError;
    console.log(data, "data");
    if (isLoading) {
        return (<div>
        <LoaderSkeleton height="100px"/>
      </div>);
    }
    if (isError) {
        return (<div>
        <p>Error</p>
      </div>);
    }
    console.log(data, "data");
    return (<>
      {data ? (<figure className="identity-stats">
          <div className="identity-stats-card">
            <div className="ticket_container grid grid-cols-3 gap-2">
              <div className="grid grid-cols-1">
                <span>Total ABSSINs (Today)</span>
                <span className="text-white text-xl font-semibold">
                  {(data &&
                ((_b = (_a = data === null || data === void 0 ? void 0 : data.response_data) === null || _a === void 0 ? void 0 : _a.tp_indv) === null || _b === void 0 ? void 0 : _b.thisDay)) ||
                "0"}{" "}
                  ABSSIN
                  {((_d = (_c = data === null || data === void 0 ? void 0 : data.response_data) === null || _c === void 0 ? void 0 : _c.tp_indv) === null || _d === void 0 ? void 0 : _d.thisDay) >
                1
                ? "s"
                : ""}{" "}

                </span>
              </div>
              <div className="grid grid-cols-1">
                <span>Total ABSSINs (This Week)</span>
                <span className="text-white text-xl font-semibold">
                  {(data &&
                ((_f = (_e = data === null || data === void 0 ? void 0 : data.response_data) === null || _e === void 0 ? void 0 : _e.tp_indv) === null || _f === void 0 ? void 0 : _f.thisWeek)) ||
                "0"}{" "}
                  ABSSIN
                  {((_h = (_g = data === null || data === void 0 ? void 0 : data.response_data) === null || _g === void 0 ? void 0 : _g.tp_indv) === null || _h === void 0 ? void 0 : _h.thisWeek) >
                1
                ? "s"
                : ""}{" "}

                </span>
              </div>

            </div>
          </div>
        </figure>) : (<LoaderSkeleton height="200px"/>)}
    </>);
};
export default IdentityStatsCard;
