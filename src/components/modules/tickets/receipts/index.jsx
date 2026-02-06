import React from "react";
import { CustomHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import ReceiptsTable from "./receiptsTable";
import { GoBackButton } from "@/src/components/common/button";
var ReceiptsComponent = function () {
    return (<div className="receipts_comp">
      <GoBackButton />
      <header className="receipts_comp_header">
        <CustomHeader title="Receipts" desc="View your receipts"/>
      </header>
      {/* <TicketsWalletCard /> */}

      <div className="receipts_comp_table">
        <ReceiptsTable />
      </div>
    </div>);
};
export default ReceiptsComponent;
