import React from "react";
// import "./style.scss" // Moved to _app;
import { TbCircleCheckFilled } from "react-icons/tb";
import Image from "next/image";
import AccessBankLogo from "../../../../assets/access_bank.png";
import FidelityBankLogo from "../../../../assets/fidelity_bank.png";
import { formatAmount } from "@/src/utils/formatAmount";
var TransferWalletCards = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var data = _a.data, activeAccount = _a.activeAccount, setActiveAccount = _a.setActiveAccount, type = _a.type, onWalletSelect = _a.onWalletSelect;
    return (<section className="walletcard">
      <div className="walletcard_container">
        <div onClick={function () { setActiveAccount("fidelity"), onWalletSelect("fidelity"); }} className={"wallet ".concat(activeAccount === "fidelity" ? "active" : "")}>
          <div className="wallet_details">
            <div className="wallet_details_icon">
              <Image src={FidelityBankLogo} alt="fidelity bank logo"/>
            </div>
            <div>
              <p className="amount">
                ₦ {formatAmount(type === "earnings" ? (_b = data === null || data === void 0 ? void 0 : data.fidelity) === null || _b === void 0 ? void 0 : _b.earnings : (_c = data === null || data === void 0 ? void 0 : data.fidelity) === null || _c === void 0 ? void 0 : _c.balance)}
              </p>
              <p>
                Wallet: <span>{(_d = data === null || data === void 0 ? void 0 : data.fidelity) === null || _d === void 0 ? void 0 : _d.account_number}</span>
              </p>
            </div>
          </div>
          <div className="wallet_check">
            {activeAccount === "fidelity" && (<TbCircleCheckFilled className="icon"/>)}
          </div>
        </div>
        <div onClick={function () { setActiveAccount("access"), onWalletSelect("access"); }} className={"wallet ".concat(activeAccount === "access" ? "active" : "")}>
          <div className="wallet_details">
            <div className="wallet_details_icon">
              <Image src={AccessBankLogo} alt="access bank logo"/>
            </div>
            <div>
              <p className="amount">
                ₦ {formatAmount(type === "earnings" ? (_e = data === null || data === void 0 ? void 0 : data.access) === null || _e === void 0 ? void 0 : _e.current_earnings : (_f = data === null || data === void 0 ? void 0 : data.access) === null || _f === void 0 ? void 0 : _f.wallet_balance)}
              </p>
              <p>
                Wallet: <span>{(_g = data === null || data === void 0 ? void 0 : data.access) === null || _g === void 0 ? void 0 : _g.wallet_id}</span>
              </p>
            </div>
          </div>
          <div className="wallet_check">
            {activeAccount === "access" && (<TbCircleCheckFilled className="icon"/>)}
          </div>
        </div>
      </div>
    </section>);
};
export default TransferWalletCards;
export var IndividualTransferWalletCards = function (_a) {
    var _b, _c, _d, _e;
    var data = _a.data, activeAccount = _a.activeAccount;
    return (<section className="walletcard">
      <div className="walletcard_container">
       {activeAccount === "fidelity" ? <div className={"wallet ".concat(activeAccount === "fidelity" ? "active" : "")}>
          <div className="wallet_details">
            <div className="wallet_details_icon">
              <Image src={FidelityBankLogo} alt="fidelity bank logo"/>
            </div>
            <div>
              <p className="amount">
                ₦ {formatAmount((_b = data === null || data === void 0 ? void 0 : data.fidelity) === null || _b === void 0 ? void 0 : _b.earnings)}
              </p>
              <p>
                Wallet: <span>{(_c = data === null || data === void 0 ? void 0 : data.fidelity) === null || _c === void 0 ? void 0 : _c.account_number}</span>
              </p>
            </div>
          </div>
          <div className="wallet_check">
            {activeAccount === "fidelity" && (<TbCircleCheckFilled className="icon"/>)}
          </div>
        </div> :
            <div className={"wallet ".concat(activeAccount === "access" ? "active" : "")}>
          <div className="wallet_details">
            <div className="wallet_details_icon">
              <Image src={AccessBankLogo} alt="access bank logo"/>
            </div>
            <div>
              <p className="amount">
                ₦ {formatAmount((_d = data === null || data === void 0 ? void 0 : data.access) === null || _d === void 0 ? void 0 : _d.current_earnings)}
              </p>
              <p>
                Wallet: <span>{(_e = data === null || data === void 0 ? void 0 : data.access) === null || _e === void 0 ? void 0 : _e.wallet_id}</span>
              </p>
            </div>
          </div>
          <div className="wallet_check">
            {activeAccount === "access" && (<TbCircleCheckFilled className="icon"/>)}
          </div>
        </div>}
      </div>
    </section>);
};
