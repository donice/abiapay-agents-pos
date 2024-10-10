import React from "react";
import "./style.scss";
import { TbChevronRight } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Image from "next/image";
import badge from "./assets/badge.png";
import { FcRules, FcNews, FcPrint } from "react-icons/fc";

const QuickLinks = ({
  name,
  link,
}: {
  name: "Identity" | "Enforcement" | "Bills" | "Bulk Prints" | "Receipts";
  link: string;
}) => {
  const router = useRouter();
  return (
    <div className="quicklink" onClick={() => router.push(link)}>
      <div className="quicklink_name">
        {" "}
        {name == "Bulk Prints" ? (
          <FcPrint className="icon" />
        ) : name == "Bills" ? (
          <FcNews className="icon" />
        ) : name == "Receipts" ? (
          <FcRules className="icon" />
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
