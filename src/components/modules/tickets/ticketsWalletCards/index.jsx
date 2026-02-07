"use client";
import React from "react";
import { fetchCollectionData, fetchDashboardData } from "@/src/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { TicketsWalletCard } from "../../dashboard/walletCard";
// import "./style.scss" // Moved to _app;
import LoaderSkeleton from "@/src/components/common/loader-skeleton";
var TicketsWalletCards = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var data = useQuery({
        queryKey: ["get_dashboard_data"],
        queryFn: function () {
            return fetchDashboardData();
        },
    }).data;
    var _w = useQuery({
        queryKey: ["ticketsWalletData"],
        queryFn: fetchCollectionData,
    }), ticketData = _w.data, isLoading = _w.isLoading, isError = _w.isError;
    console.log(ticketData);
    if (isLoading) {
        return (<div>
            <LoaderSkeleton height="100px" />
        </div>);
    }
    if (isError) {
        return (<div>
            <p>Error</p>
        </div>);
    }
    return (<div className="ticketspage_wallet">
        <TicketsWalletCard bank={"access"} data={{
            total_credit: undefined,
            total_debit: data === null || data === void 0 ? void 0 : data.ledger_balance,
            balance: undefined,
            earnings: undefined,
            account_name: data === null || data === void 0 ? void 0 : data.access.wallet_name,
            account_number: (_a = data === null || data === void 0 ? void 0 : data.access) === null || _a === void 0 ? void 0 : _a.wallet_id,
            bank_name: "access",
            current_earnings: (_b = data === null || data === void 0 ? void 0 : data.access) === null || _b === void 0 ? void 0 : _b.current_earnings,
            wallet_balance: (_c = data === null || data === void 0 ? void 0 : data.access) === null || _c === void 0 ? void 0 : _c.wallet_balance,
            wallet_id: (_d = data === null || data === void 0 ? void 0 : data.access) === null || _d === void 0 ? void 0 : _d.wallet_id,
            wallet_name: (_e = data === null || data === void 0 ? void 0 : data.access) === null || _e === void 0 ? void 0 : _e.wallet_name,
            this_month_count: (_f = ticketData === null || ticketData === void 0 ? void 0 : ticketData.data[0]) === null || _f === void 0 ? void 0 : _f.total_transaction_monthly,
            this_month_amount: (_g = ticketData === null || ticketData === void 0 ? void 0 : ticketData.data[0]) === null || _g === void 0 ? void 0 : _g.total_amount_monthly,
            this_week_count: (_h = ticketData === null || ticketData === void 0 ? void 0 : ticketData.data[0]) === null || _h === void 0 ? void 0 : _h.total_transaction_weekly,
            this_week_amount: (_j = ticketData === null || ticketData === void 0 ? void 0 : ticketData.data[0]) === null || _j === void 0 ? void 0 : _j.total_amount_weekly
        }} />
    </div>);
};
export default TicketsWalletCards;
