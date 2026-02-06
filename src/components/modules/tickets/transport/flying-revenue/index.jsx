"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FlyingRevenue } from "@/src/components/common/modal";
import FlyingRevenueForm from "./form";
import { haulages } from "./lib/haulages";
import { GoBackButton } from "@/src/components/common/button";
var FlyingRevenueComponent = function (_a) {
    var slug = _a.slug;
    var router = useRouter();
    var _b = useState({
        mode: false,
        message: "",
        expiry_date: "",
        payment_ref: "",
    }), show = _b[0], setShow = _b[1];
    var haulageItem = haulages.find(function (item) { return item.name.includes(slug); });
    return (<div>
      <GoBackButton />
      <CustomHeader title={haulageItem ? "".concat(haulageItem.title, " Flying Revenue") : ""} desc="Haulage Tickets"/>

      <FlyingRevenueForm slug={slug} setShow={setShow}/>
      {show.mode && (<FlyingRevenue maintext={show.message} payment_ref={show.payment_ref} button_text="Completed" onClick={function () {
                router.push("/tickets/transport/flying-revenue");
            }}/>)}
    </div>);
};
export default FlyingRevenueComponent;
