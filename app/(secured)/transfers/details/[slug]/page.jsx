"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/common/button";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import { fetchTransferHistory } from "@/src/services/transactions";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/src/components/common/loader/redirecting";
import { useRouter } from "next/navigation";
import Empty from "@/src/components/common/empty";
var Dynamic = function (_a) {
    var _b;
    var params = _a.params;
    var router = useRouter();
    var _c = useState(), ticket = _c[0], setTicket = _c[1];
    var _d = useQuery({
        queryKey: ["transfer_history"],
        queryFn: function () {
            return fetchTransferHistory();
        },
    }), data = _d.data, isLoading = _d.isLoading;
    var filtereddata = (_b = data === null || data === void 0 ? void 0 : data.response_data) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.id) == (params === null || params === void 0 ? void 0 : params.slug); })[0];
    useEffect(function () {
        setTicket(filtereddata);
    }, [data, params === null || params === void 0 ? void 0 : params.slug]);
    return (<>
      {isLoading ? (<Loading />) : (<>
          {(data === null || data === void 0 ? void 0 : data.response_data.length) > 0 ? (<div className="ticket-details">
              <h1>More Transaction Details</h1>
              <div className="ticket-details_comp">
                <div>
                  <p>Status</p>
                  <p>{ticket === null || ticket === void 0 ? void 0 : ticket.paymentStatus}</p>
                </div>

                <div>
                  <p>Amount</p>
                  <p>₦ {formatAmount(ticket === null || ticket === void 0 ? void 0 : ticket.payer_amountPaid)}</p>
                </div>
                <div>
                  <p>Bank</p>
                  <p>{ticket === null || ticket === void 0 ? void 0 : ticket.merchant_bankName}</p>
                </div>

                <div>
                  <p>Payer Name</p>
                  <p>{ticket === null || ticket === void 0 ? void 0 : ticket.payer_accountName}</p>
                </div>

                <div>
                  <p>Payer Account</p>
                  <p>{ticket === null || ticket === void 0 ? void 0 : ticket.payer_accountNumber}</p>
                </div>

                <div>
                  <p>Transaction Ref</p>
                  <p>{ticket === null || ticket === void 0 ? void 0 : ticket.sessionId}</p>
                </div>
                <div>
                  <p>Transaction Date</p>
                  <p>{ticket === null || ticket === void 0 ? void 0 : ticket.createTime}</p>
                </div>
              </div>

              <Button text="Go Back" onClick={function () {
                    router.push("/transfers");
                }}/>
              
            </div>) : (<div>
              <Empty text="No data"/>
            </div>)}
        </>)}
    </>);
};
export default Dynamic;
