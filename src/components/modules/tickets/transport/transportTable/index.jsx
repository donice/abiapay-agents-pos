"use client";
import React, { useState, useMemo } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/src/components/common/loader/redirecting";
// import "./style.scss" // Moved to _app;
import Empty from "@/src/components/common/empty";
import { formatAmount } from "@/src/utils/formatAmount";
import { useRouter } from "next/router";
import { fetchTransactions } from "@/src/services/ticketsServices";
import { TbLoader, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineRestartAlt } from "react-icons/md";
var TransactionsTable = function () {
    var router = useRouter();
    var _a = useState(""), searchTerm = _a[0], setSearchTerm = _a[1];
    var debouncedSearchTerm = useDebounce(searchTerm, 500);
    var _b = useQuery({
        queryKey: ["get_transactions"],
        queryFn: function () {
            return fetchTransactions();
        },
    }), data = _b.data, isError = _b.isError, isLoading = _b.isLoading;
    var fetched_data = (data === null || data === void 0 ? void 0 : data.data) || [];
    var filteredTransactions = useMemo(function () {
        if (!debouncedSearchTerm)
            return fetched_data;
        var filtered = fetched_data.filter(function (transaction) {
            var _a;
            return (_a = transaction === null || transaction === void 0 ? void 0 : transaction.trans_ref) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        });
        if (filtered.length === 0) {
            console.log("No results found for:", debouncedSearchTerm);
            // console.log("Fetched Data:", fetched_data);
        }
        return filtered;
    }, [debouncedSearchTerm, fetched_data]);
    if (isLoading) {
        return (<div className={"loading"}>
        <Loading />
      </div>);
    }
    if (isError) {
        console.log(data);
    }
    if (!data || data.length === 0) {
        return (<div className={"empty"}>
        <Empty />
      </div>);
    }
    return (<section className="main-table">
      <div className="filter-input">
        <label htmlFor="search">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3ba361" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
        </label>
        <input type="text" placeholder="Search by Plate Number" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="search input"/>
      </div>

      {filteredTransactions.length > 0 ? (<div className="main-table_form_tickets_container">
          <div className="tickets">
            {filteredTransactions.map(function (transaction) { return (<div key={transaction.idagent_transactions} className="ticket" onClick={function () {
                    return router.push("/tickets/transport/".concat(transaction.idagent_transactions));
                }}>
                <div>
                  <p>{transaction.trans_ref}</p>
                  <p>{transaction.revenue_item}</p>
                  <p>{new Date(transaction.createtime).toLocaleString()}</p>
                  <p>Ref: {transaction.payment_ref}</p>
                </div>
                <div>
                  <p>₦{formatAmount(transaction.amount)}</p>
                  <p className={"".concat(transaction.status === "Completed"
                    ? "completed"
                    : "pending")}>
                    {transaction.status === "Completed" ? (<TbRosetteDiscountCheckFilled />) : (<TbLoader />)}
                    {transaction.status}
                  </p>

                  <p className="next_date">
                    <span>
                      <MdOutlineRestartAlt className="icon"/>
                    </span>
                    <span>
                      {" "}
                      {new Date(transaction.next_date).toLocaleString()}
                    </span>
                  </p>
                  <p>Valid for: {transaction.payment_period}</p>
                </div>
              </div>); })}
          </div>
        </div>) : (<Empty text="No tickets found"/>)}
    </section>);
};
export default TransactionsTable;
