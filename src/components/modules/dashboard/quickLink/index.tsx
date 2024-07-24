import React from "react";
import "./style.scss";
import { TbChevronRight, TbLineScan } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Image from "next/image";
import scanner from "./assets/scanner.png";
import reports from "./assets/reports.png";
import badge from "./assets/badge.png";

const QuickLinks = ({
  name,
  link,
}: {
  name: "Identity" | "Enforcement" | "Reports";
  link: string;
}) => {
  const router = useRouter();
  return (
    <div className="quicklink" onClick={() => router.push(link)}>
      <div className="quicklink_name">
        {" "}
        {name == "Identity" ? (
          <Image src={scanner} alt="scanner" className="icon" />
        ) : name == "Reports" ? (
          <Image src={reports} alt="reports" className="icon" />
        ) : (
          <Image src={badge} alt="badge" className="icon" />
        )}
        <span>{name}</span>
      </div>
      <TbChevronRight />
    </div>
  );
};

export default QuickLinks;
