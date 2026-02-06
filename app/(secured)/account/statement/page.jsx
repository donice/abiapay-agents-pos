"use client";
import React from "react";
import { Button } from "@/src/components/common/button";
import "./style.scss";
import { useQuery } from "@tanstack/react-query";
import { CustomHeader } from "@/src/components/common/header";
import { fetchAccountStatement } from "@/src/services/accountServices";
import { fetchDashboardData } from "@/src/services/dashboardService";
import { Loading } from "@/src/components/common/loader/redirecting";
import { formatAmount } from "@/src/utils/formatAmount";
import { useRouter } from "next/navigation";
var Dynamic = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    var router = useRouter();
    var _v = useQuery({
        queryKey: ["my-statement"],
        queryFn: fetchAccountStatement,
    }), statementData = _v.data, isStatementPending = _v.isPending;
    var _w = useQuery({
        queryKey: ["dashboard-data"],
        queryFn: fetchDashboardData, // Assuming this fetches the dashboard data
    }), dashboardData = _w.data, isDashboardPending = _w.isPending;
    if (isStatementPending || isDashboardPending) {
        return <Loading />;
    }
    var accessEarnings = ((_a = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.access) === null || _a === void 0 ? void 0 : _a.current_earnings) || 0;
    var fidelityEarnings = ((_b = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.fidelity) === null || _b === void 0 ? void 0 : _b.earnings) || 0;
    var totalEarnings = accessEarnings + fidelityEarnings;
    return (<>
      {" "}
      <CustomHeader title={"Account Statement"} desc={"Account Statement Details"}/>
      {isStatementPending || isDashboardPending ? (<Loading />) : (<div className="statement">
          <div className="statement_comp">
            <div>
              <p>Full name</p>
              <p>{((_c = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _c === void 0 ? void 0 : _c.fullname) || "-"}</p>
            </div>

            <div>
              <p>User Category</p>
              <p>{((_d = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _d === void 0 ? void 0 : _d.user_cat) || "-"}</p>
            </div>

            <div>
              <p>Agent Code</p>
              <p>{((_e = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _e === void 0 ? void 0 : _e.agent_code) || "-"} </p>
            </div>

            <div>
              <p>Email</p>
              <p>{((_f = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _f === void 0 ? void 0 : _f.email) || "-"} </p>
            </div>

            <div>
              <p>L.G.A</p>
              <p>{((_g = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _g === void 0 ? void 0 : _g.lga) || "-"} </p>
            </div>

            <div>
              <p>Account Status</p>
              <p>{((_h = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _h === void 0 ? void 0 : _h.account_status) || "-"} </p>
            </div>
            <div>
              <p>Pending Transactions</p>
              <p>
                ₦{formatAmount((_j = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _j === void 0 ? void 0 : _j.pending_transactions) || "-"} /{" "}
                {((_k = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _k === void 0 ? void 0 : _k.pending_transactions_count) || "0"}{" "}
              </p>
            </div>
            <div>
              <p>Total Transactions</p>
              <p>
                ₦{formatAmount((_l = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _l === void 0 ? void 0 : _l.total_transactions) || "-"} /{" "}
                {((_m = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _m === void 0 ? void 0 : _m.total_transactions_count) || "0"}{" "}
              </p>
            </div>
            <div>
              <p>Total Transactions Today</p>
              <p>
                ₦{formatAmount((_o = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _o === void 0 ? void 0 : _o.total_transactions_today) || "-"} /{" "}
                {((_p = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _p === void 0 ? void 0 : _p.total_transactions_today_count) || "0"}{" "}
              </p>
            </div>
            <div>
              <p>Wallet Balance</p>
              <p>₦{formatAmount((_q = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _q === void 0 ? void 0 : _q.wallet_balance) || "-"} </p>
            </div>
            <div>
              <p>Total Wallet Credit </p>
              <p>₦{formatAmount((_r = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _r === void 0 ? void 0 : _r.total_wallet_credit) || "-"} </p>
            </div>
            <div>
              <p>Access Earnings </p>
              <p>₦{formatAmount((_s = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.access) === null || _s === void 0 ? void 0 : _s.current_earnings) || "-"} </p>
            </div>
            <div>
              <p>Fidelity Earnings </p>
              <p>₦{formatAmount((_t = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.fidelity) === null || _t === void 0 ? void 0 : _t.earnings) || "-"} </p>
            </div>
            <div>
              <p>Total Earnings</p>
              <p>₦{formatAmount(totalEarnings) || "-"} </p>
            </div>
            <div className="creation_date">
              <p>Creation Date </p>
              <p> {((_u = statementData === null || statementData === void 0 ? void 0 : statementData.data) === null || _u === void 0 ? void 0 : _u.creation_date) || "-"}</p>
            </div>
          </div>

          <div className="statement_cta">
            <div className="statement_cta_info">
              <p>
                Payout requests will be activated when your current earnings are
                N100, and above
              </p>
            </div>
            <Button 
        // disabled={true}
        text={"Fidelity Cashout"} onClick={function () {
                router.push("/account/statement/fidelity");
            }}/>
            <Button text={"Access Cashout"} onClick={function () {
                router.push("/account/statement/access");
            }}/>
          </div>
        </div>)}
    </>);
};
export default Dynamic;
