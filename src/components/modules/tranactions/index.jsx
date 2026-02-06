"use client";
import React from "react";
import { CustomHeader } from "../../common/header";
import { formatAmount } from "@/src/utils/formatAmount";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import { GoBackButton } from "../../common/button";
import Empty from "../../common/empty";
// import "./style.scss" // Moved to _app;
import { useQuery } from "@tanstack/react-query";
import { fetchTransferHistory } from "@/src/services/transactions";
import { Loading } from "../../common/loader/redirecting";
import toast from "react-hot-toast";
var TransactionsComponent = function () {
    var router = useRouter();
    var _a = useQuery({
        queryKey: ["transfer_history"],
        queryFn: function () {
            return fetchTransferHistory();
        },
    }), data = _a.data, isError = _a.isError, isLoading = _a.isLoading;
    // console.log(data.response_data);
    if (isError) {
        toast.error("Something went wrong fetching transactions");
        console.log("error");
    }
    return (<div className="tranactions">
      <GoBackButton />

      <div className="tranactions-comp">
        <header>
          <CustomHeader title="Wallet Transactions" desc="View all tranactions"/>
        </header>

        <div className="tranactions-comp_form">
          {/* {data && data.length > 0 ? ( */}
          {(data === null || data === void 0 ? void 0 : data.response_data) && (data === null || data === void 0 ? void 0 : data.response_data.length) > 0 ? (<div className="tranactions-comp_form_tickets_container">
              <div className="tickets">
                {data.response_data.map(function (transaction) { return (<div key={transaction.id} className="ticket" onClick={function () {
                    return router.push("/transfers/details/".concat(transaction.id));
                }}>
                    <div>
                      <p>{transaction.payer_accountName}</p>
                      <p>{transaction.payer_accountNumber}</p>
                      <p>{new Date(transaction.createTime).toLocaleString()}</p>
                      <p>{transaction.reference}</p>
                    </div>
                    <div>
                      <p className={"".concat(transaction.paymentStatus === "PAID" ? "completed" : " ")}>
                        {transaction.paymentStatus === "PAID" && <GoVerified />}
                        {transaction.paymentStatus}
                      </p>
                      <p>₦{formatAmount(transaction.payer_amountPaid)}</p>
                    </div>
                  </div>); })}
              </div>
            </div>) : isLoading ? <Loading /> : (<Empty text="No Transactions found"/>)}
        </div>
      </div>
    </div>);
};
export default TransactionsComponent;
