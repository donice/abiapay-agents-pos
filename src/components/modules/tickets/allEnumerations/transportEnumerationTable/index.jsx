"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/src/components/common/loader/redirecting";
// import "./style.scss" // Moved to _app;
import Empty from "@/src/components/common/empty";
import { formatAmount } from "@/src/utils/formatAmount";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { fetchCompletedTransportEnumeration } from "@/src/services/transportEnumerationService";
var TransportEnumerationTable = function () {
    var router = useRouter();
    var _a = useQuery({
        queryKey: ["fetchCompletedTransportEnumeration"],
        queryFn: fetchCompletedTransportEnumeration,
    }), data = _a.data, error = _a.error, isLoading = _a.isLoading, isError = _a.isError;
    var fetced_data = (data === null || data === void 0 ? void 0 : data.data) || [];
    if (isLoading) {
        return (<div className={"loading"}>
        <Loading />
      </div>);
    }
    if (isError) {
        toast.error(error instanceof Error ? error.message : "Unknown error");
    }
    if (!data || data.length === 0) {
        return (<div className={"empty"}>
        <Empty />
      </div>);
    }
    console.log(fetced_data);
    return (<section className="main-table">
      {fetced_data.length > 0 ? (<div className="main-table_form_tickets_container">
          <div className="">
            {fetced_data.map(function (transaction) { return (<div key={transaction.idagent_transactions} 
            // className="ticket"
            className="border border-green-200  shadow-sm p-4 rounded-lg mb-4 grid grid-cols-2 justify-between" onClick={function () {
                    return router.push("/enumeration/transport/view/".concat(transaction.EnumerationID));
                }}>
                <div>
                  <p className="grid">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Enumeration ID:
                    </span>{" "}
                    <span className="text-green-700 text-xl font-bold">
                      {transaction.EnumerationID}
                    </span>{" "}
                  </p>

                  <p>
                    {" "}
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Date & Time:
                    </span>{" "}
                    <p className="font-semibold text-gray-600 text-sm">
                      {new Date(transaction.CreateTime).toLocaleString()}
                    </p>
                  </p>

                  <p className="grid">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Taxpayer Name:
                    </span>{" "}
                    <span className="text-gray-900 text-[12px] font-semibold">
                      {transaction.TaxpayerName}, {transaction.TaxpayerID}
                    </span>
                  </p>
                </div>
                <div className="text-right">

                  <div className="grid grid-cols-2">
                     <p>
                    {" "}
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Asset Code:
                    </span>{" "}
                    <p className="font-semibold text-gray-600 text-sm">
                      {transaction.assetCode}
                    </p>
                  </p>
                  <p>
                    {" "}
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Amount:
                    </span>{" "}
                    <p className="font-semibold text-gray-600 text-sm">
                    ₦{formatAmount(transaction.IncomeAmount)}
                    </p>
                  </p>
                  </div>

                  <p>
                    {" "}
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Category & Union:
                    </span>{" "}
                    <p className="font-semibold text-gray-600 text-sm">
                    {transaction.IncomeCategory}, {transaction.UnionName}
                    </p>
                  </p>
                  <p>
                    {" "}
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Plate Number:
                    </span>{" "}
                    <p className="font-semibold text-gray-600 text-sm">
                    {transaction.PlateNumber}
                    </p>
                  </p>
                </div>
              </div>); })}
          </div>
        </div>) : (<Empty text="No tickets found"/>)}
    </section>);
};
export default TransportEnumerationTable;
