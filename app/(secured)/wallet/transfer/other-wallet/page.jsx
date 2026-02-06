"use client";
import React from "react";
import { Button } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { useRouter } from "next/navigation";
var Dynamic = function () {
    var router = useRouter();
    return (<>
      {" "}
      <CustomHeader title={"Transfer to other wallets"} desc={"Select wallet"}/>
      <div className="other-wallet">
        <div className="other-wallet_cta">
          {/* <div className="other-wallet_cta_info">
            <p>
              Payout requests will be activated when your current earnings are
              N100, and above
            </p>
          </div> */}
          <Button text={"Fidelity Wallet Transfer"} onClick={function () {
            router.push("/wallet/transfer/other-wallet/fidelity");
        }}/>
          <Button text={"Access Wallet Transfer"} onClick={function () {
            router.push("/wallet/transfer/other-wallet/access");
        }}/>
        </div>
      </div>
    </>);
};
export default Dynamic;
