import React from "react";
// import "./style.scss" // Moved to _app;
import { TbChevronRight } from "react-icons/tb";
import { useRouter } from "next/router";
import Image from "next/image";
import badge from "./assets/badge.png";
import { FcRules, FcNews, FcPrint, FcAutomotive, FcDeleteDatabase, FcBusinessContact, FcBriefcase, } from "react-icons/fc";
var QuickLinks = function (_a) {
    var name = _a.name, link = _a.link, comingSoon = _a.comingSoon;
    var router = useRouter();
    return (<div className="quicklink" onClick={function () { return (comingSoon ? null : router.push(link)); }}>
      <div className="quicklink_name">
        {" "}
        {name == "Bulk Prints" ? (<FcPrint className="icon"/>) : name == "ABSSAA" ? (<FcBusinessContact className="icon"/>) : name == "Bills" ? (<FcNews className="icon"/>) : name == "Receipts" ? (<FcRules className="icon"/>) : name == "Demand Notices" ? (<FcRules className="icon"/>) : name == "Verify Vehicle Status" ? (<FcAutomotive className="icon"/>) : name == "Traffic Offence Ticket" ? (<FcDeleteDatabase className="icon"/>) : name == "Ticket Fines" ? (<FcDeleteDatabase className="icon"/>) : name == "Contract Management" ? (<FcBriefcase className="icon"/>) : name == "Identity" ? <FcBusinessContact className="icon"/> : (<Image src={badge} alt="badge" className="icon"/>)}
        <span>{name}</span>
      </div>
      {comingSoon ? (<span className="coming-soon">Coming Soon</span>) : (<TbChevronRight />)}
    </div>);
};
export default QuickLinks;
