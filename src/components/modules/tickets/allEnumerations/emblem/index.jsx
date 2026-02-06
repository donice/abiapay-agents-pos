"use client";
import { CustomHeader } from "@/src/components/common/header";
import React, { useState } from "react";
import CreateEmblemForm from "./form";
import { useRouter } from "next/router";
import { EmblemModal } from "@/src/components/common/modal";
var TransportEmblemComponent = function () {
    var router = useRouter();
    var _a = useState({
        mode: false,
        message: "",
        expiry_date: "",
        payment_ref: "",
    }), show = _a[0], setShow = _a[1];
    return (<div>
      <CustomHeader title="Transport Emblem" desc="Create Transport Emblem"/>

      <CreateEmblemForm setShow={setShow}/>
      {show.mode && (<EmblemModal maintext={show.message} exp_date={show.expiry_date} payment_ref={show.payment_ref} button_text="Done" onClick={function () {
                router.push("/tickets");
            }}/>)}
    </div>);
};
export default TransportEmblemComponent;
