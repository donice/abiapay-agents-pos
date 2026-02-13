;
import React from "react";
import { Button } from "@/src/components/common/button";
import "./style.scss";
import { CustomHeader } from "@/src/components/common/header";
import { useRouter } from "next/router";
import { appMetadata } from "@/src/lib/app";

const Dynamic = () => {
  const router = useRouter();

  const walletBanks = appMetadata.banksAllowed.filter(
    (bank:any) =>
      bank.allowed &&
      ["access", "fidelity"].includes(bank.value)
  );

  return (
    <>
      <CustomHeader
        title="Transfer to other wallets"
        desc="Select wallet"
      />

      <div className="other-wallet">
        <div className="other-wallet_cta">
          {walletBanks.map((bank) => (
            <Button
              key={bank.value}
              text={`${bank.name} Wallet Transfer`}
              onClick={() => {
                router.push(
                  `/wallet/transfer/other-wallet/${bank.value}`
                );
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dynamic;
