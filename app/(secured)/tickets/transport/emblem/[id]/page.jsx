"use client";
import ViewTransportEmblemReceipt from "@/src/components/modules/tickets/transport/emblem/view";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
var EmblemReceiptPage = function (_a) {
    var params = _a.params;
    if (params.id == "view") {
        redirect("/tickets/transport/emblem/view");
    }
    var querySearch = useSearchParams();
    var payment_ref = querySearch.get("payment_ref") || "";
    return (<div>
      <ViewTransportEmblemReceipt plate_no={params.id} payment_ref={payment_ref}/>
    </div>);
};
export default EmblemReceiptPage;
