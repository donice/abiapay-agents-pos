import React from "react";
import "./style.scss";
import { formatAmount } from "@/src/utils/formatAmount";
import Image from "next/image";
import AccessBankLogo from "../../../assets/access_bank.png";
import FidelityBankLogo from "../../../assets/fidelity_bank.png";

interface WalletCardProps {
  bank: "access" | "fidelity";
  data: {
    total_credit?: string | null;
    total_debit?: string | null;
    balance?: string | null;
    earnings?: string | null;
    account_name?: string | null;
    account_number?: string | null;
    bank_name?: string | null;
    current_earnings?: string | null;
    wallet_balance?: string | null;
    wallet_id?: string | null;
    wallet_name?: string | null;
  };
}

const WalletCard = ({ bank, data }: WalletCardProps) => {
  return (
    <>
      {" "}
      {bank === "access" ? (
        <div className="wallet-card">
          <div className="wallet-card_balance">
            <span>Wallet Balance</span>
            <span>₦{formatAmount(Number(data?.wallet_balance))}</span>
            <span>Acc Number: {data?.wallet_id}</span>
          </div>

          <div className="wallet-card_image">
            <Image src={AccessBankLogo} alt="access bank logo" />
          </div>

          <div className="wallet-card_earnings">
            <span> Current Earnings</span>
            <span>₦{formatAmount(Number(data?.current_earnings))}</span>
            {/* <span>Account Name: {data?.wallet_name}</span> */}
          </div>
        </div>
      ) : (
        <div className="wallet-card">
          <div className="wallet-card_balance">
            <span>Wallet Balance</span>
            <span>₦{formatAmount(Number(data?.balance))}</span>
            <span>Acc Number: {data?.account_number}</span>
            
          </div>

          <div className="wallet-card_image">
            <Image src={FidelityBankLogo} alt="fidelity bank logo" />
          </div>

          <div className="wallet-card_earnings">
            <span>Current Earnings</span>
            <span>₦{formatAmount(Number(data?.earnings))}</span>
            {/* <span>Account Name: {data?.account_name}</span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default WalletCard;
