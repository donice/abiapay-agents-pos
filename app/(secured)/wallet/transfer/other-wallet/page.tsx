"use client";
import React from "react";
import { Button } from "@/src/components/common/button";
import "./style.scss";
import { useQuery } from "@tanstack/react-query";
import { CustomHeader } from "@/src/components/common/header";
import { fetchAccountStatement } from "@/src/services/accountServices";
import { Loading } from "@/src/components/common/loader/redirecting";
import { useRouter } from "next/navigation";

const Dynamic = () => {
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["other-wallet"],
    queryFn: fetchAccountStatement,
  });

  return (
    <>
      {" "}
      <CustomHeader
        title={"Transfer to other wallets"}
        desc={"Select wallet"}
      />
      {isPending ? (
        <Loading />
      ) : (
        <div className="other-wallet">

          <div className="other-wallet_cta">
            {/* <div className="other-wallet_cta_info">
              <p>
                Payout requests will be activated when your current earnings are
                N100, and above
              </p>
            </div> */}
            <Button
              text={"Fidelity Wallet Transfer"}
              onClick={() => {
                router.push("/wallet/transfer/other-wallet/fidelity");
              }}
            />
            <Button
              text={"Access Wallet Transfer"}
              onClick={() => {
                router.push("/wallet/transfer/other-wallet/access");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dynamic;
