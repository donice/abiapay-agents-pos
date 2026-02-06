import React from "react";
import { CustomHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import TransactionsTable from "./transportEnumerationTable";
var ViewTransportEnumerationComponent = function () {
    return (<div className="transport">
      <header className="transport_header">
        <CustomHeader title="Completed Enumerations" desc="View all completed Enumerations"/>
      </header>
      {/* <TicketsWalletCard /> */}

      <div className="transport_table">
        <TransactionsTable />
      </div>
    </div>);
};
export default ViewTransportEnumerationComponent;
