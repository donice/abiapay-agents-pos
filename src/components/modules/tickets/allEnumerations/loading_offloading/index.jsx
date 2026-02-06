"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { OffloadingModal } from "@/src/components/common/modal";
import LoadingOffLoadingForm from "./form";
var LoadingOffLoadingPageComponent = function () {
    var router = useRouter();
    var _a = useState({
        mode: false,
        message: "",
        expiry_date: "",
        payment_ref: "",
    }), show = _a[0], setShow = _a[1];
    return (<div>
      <CustomHeader title="Transport Loading & Offloading" desc="Register Loading & Offloading Vehicles"/>

      <LoadingOffLoadingForm setShow={setShow}/>
      {show.mode && (<OffloadingModal maintext={show.message} payment_ref={show.payment_ref} button_text="Completed" onClick={function () {
                router.push("/tickets");
            }}/>)}
    </div>);
};
export default LoadingOffLoadingPageComponent;
