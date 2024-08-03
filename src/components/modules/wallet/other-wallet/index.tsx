"use client";
import React, { useState } from "react";
import "./style.scss";
import { TbCircleCheckFilled } from "react-icons/tb";
import Image from "next/image";
import AccessBankLogo from "../../../assets/access_bank.png";
import FidelityBankLogo from "../../../assets/fidelity_bank.png";
import { formatAmount } from "@/src/utils/formatAmount";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/src/services/dashboardService";

const OtherWalletsTransferComponent = () => {
  const [activeAccount, setActiveAccount] = useState("access");

  const { data } = useQuery({
    queryKey: ['get_dashboard_data'],
    queryFn: () => {
      return fetchDashboardData();
    }
  })

  console.log(data);

  return (
    <section className="other-wallet">
      <div className="other-wallet_container">
        <div onClick={() => setActiveAccount("fidelity")} className={`wallet ${activeAccount === "fidelity" ? "active" : ""}`}>
          <div className="wallet_details">
            <div className="wallet_details_icon">
              <Image src={FidelityBankLogo} alt="fidelity bank logo" />
            </div>
            <div>
              <p className="amount">₦ {formatAmount(data?.fidelity?.balance)}</p>
              <p>
                Wallet: <span>{data?.fidelity?.account_number}</span>
              </p>
            </div>
          </div>
          <div className="wallet_check">
            {activeAccount === "fidelity" && <TbCircleCheckFilled className="icon"/>}
          </div>
        </div>
        <div onClick={() => setActiveAccount("access")} className={`wallet ${activeAccount === "access" ? "active" : ""}`}>
          <div className="wallet_details">
            <div className="wallet_details_icon">
              <Image src={AccessBankLogo} alt="access bank logo" />
            </div>
            <div>
              <p className="amount">₦ {formatAmount(data?.access?.wallet_balance)}</p>
              <p>
                Wallet: <span>{data?.access?.wallet_id}</span>
              </p>
            </div>
          </div>
          <div className="wallet_check">
           {activeAccount === "access" && <TbCircleCheckFilled className="icon"/>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherWalletsTransferComponent;
