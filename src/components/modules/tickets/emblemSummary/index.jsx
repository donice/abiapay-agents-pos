"use client";
import React, { useRef } from "react";
import { CustomFormHeader } from "@/src/components/common/header";
// import "./style.scss" // Moved to _app;
import { Button, GoBackButton, PrimaryButton, } from "@/src/components/common/button";
import { Loading } from "@/src/components/common/loader/redirecting";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import { formatAmount } from "@/src/utils/formatAmount";
import { AbiaStateLogo } from "@/src/components/common/Images";
import { useReactToPrint } from "react-to-print";
import { useSearchParams } from "@/src/utils/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleEmblem } from "@/src/services/ticketsServices";
import Empty from "@/src/components/common/empty";
var EmblemSummary = function () {
    var _a, _b;
    var params = useSearchParams();
    var pay_ref = params.get("payment_ref");
    var componentRef = useRef(null);
    var _c = useQuery({
        queryKey: ["emblemSummary", pay_ref],
        queryFn: function () {
            return fetchSingleEmblem(pay_ref);
        },
    }), data = _c.data, isLoading = _c.isLoading;
    console.log(data === null || data === void 0 ? void 0 : data.response_data[0]);
    var displayKeys = [
        "trans_date",
        "trans_ref",
        "rev_head",
        "rev_code",
        "payment_ref",
        "payment_period",
        "trans_channel",
        "status",
        "trans_type",
        "lga",
        "vehicle_type",
        "vehicle_content",
        "taxpayer_name",
        "taxpayer_email",
        "taxpayer_phone",
        "revenue_item",
        "payment_method",
        "plate_number",
        "payment_date",
        // "taxoffice"
    ];
    var amount = data === null || data === void 0 ? void 0 : data.amount;
    var handlePrint = useReactToPrint({
        content: function () { return componentRef.current; },
        documentTitle: "receipt_$",
        // documentTitle: `receipt_${res?.invoice_id}`,
    });
    return (<section className="tickets">
      <GoBackButton />

      <div id="tickets-summary-comp" className="tickets-summary-comp">
        <div style={{ width: "100%", maxWidth: "500px" }} ref={componentRef} className="tickets-summary-comp_container">
          <div className="tickets-summary-comp_container_logo">
            <AbiaStateLogo />
            <CustomFormHeader title="Transaction Receipt" desc="View the details for your Purchased Ticket"/>
          </div>
          {isLoading ? <Loading /> : data ? (<>
              {" "}
              <div key={"amount"} className="tickets-summary-comp_container_amount">
                <p>{formatAmount((_a = data === null || data === void 0 ? void 0 : data.response_data[0]) === null || _a === void 0 ? void 0 : _a.amount)}</p>
              </div>
              <div>
                {Object.entries(data === null || data === void 0 ? void 0 : data.response_data[0])
                .filter(function (_a) {
                var key = _a[0];
                return displayKeys.includes(key);
            })
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                return (<div key={key} className="line-items">
                      <p>{CamelCaseToTitleCase(key)}:</p>
                      <p className="text-right">
                        {key === "wallet_type"
                        ? CamelCaseToTitleCase(value)
                        : String(value)}
                      </p>
                    </div>);
            })}
              </div>{" "}
              <div className="btn_container">
                <PrimaryButton text="View Certificate" link={"/tickets/transport/emblem/".concat((_b = data === null || data === void 0 ? void 0 : data.response_data[0]) === null || _b === void 0 ? void 0 : _b.plate_number, "?payment_ref=").concat(pay_ref)}/>
                <Button text="Share Receipt" onClick={handlePrint}/>
              </div>
            </>) : (<Empty />)}
        </div>
      </div>
    </section>);
};
export default EmblemSummary;
