import { CustomHeader } from "@/src/components/common/header";
import React from "react";
import Image from "next/image";
import style from "./style.module.scss";

import abiaLogo from "@/public/logos/emblem/abia_@33.jpg";
import coaLogo from "@/public/logos/emblem/coat_of_arm.png";
import jtb from "@/public/logos/emblem/jtb.png";

const ViewTransportEmblemReceipt = ({
  plate_no,
  payment_ref,
}: {
  plate_no: string;
  payment_ref: string;
}) => {
  return (
    <div>
      <CustomHeader
        title={"Emblem Receipt"}
        desc="View Transport Emblem Receipt"
      />

      <section className={style.emblem}>
        <div className={style.emblem_receipt}>
          <header className={style.emblem_receipt_header}>
            <div className={style.emblem_receipt_header_logos}>
              <Image src={abiaLogo} alt="obia" width={100} height={100} />
              <Image src={coaLogo} alt="coa" width={100} height={100} />{" "}
              <Image src={jtb} alt="jtb" width={100} height={100} />
            </div>
            <div className={style.emblem_receipt_header_title}>
              <h1>ABIA STATE GOVERNMENT</h1>
              <h2>2025 CONSOLIDATED EMBLEM</h2>
              <h2>for </h2>
            </div>
            <div className={style.emblem_receipt_header_reference}>
              <p>{plate_no}</p> <p>{payment_ref}</p>
            </div>
          </header>

          <div className={style.emblem_receipt_clearance}>
            <header className={style.emblem_receipt_clearance_header}>
              CLEARANCE CERTIFICATE
            </header>
            <ol className={style.emblem_receipt_clearance_list}>
              <li>Board of Internal Revenue (Hackney Carriage)</li>
              <li>
                Sanitation Sticker/Pollution/Effluent Discharge/Emission Control
              </li>
              <li>MOT Sticker</li>
              <li>Haulage Permit</li>
              <li>Safety Emblem</li>
              <li>Natural Freight</li>
              <li>Commodity Sticker</li>
              <li>Loading and Off Loading</li>
              <li>Route/Inter State/Road Tax Warrant Permit</li>
              <li>Ogepa Sticker</li>
              <li>Agric Levy</li>
              <li>Federal Ocean Terminal</li>
              <li>Airport</li>
              <li>Mid-Year Sticker</li>
            </ol>
          </div>

          <div className={style.emblem_receipt_footer}>
            <p className={style.emblem_receipt_footer_text}>
              This is to Certify that the vehicle with the sticker receipt has
              satisfied every lawful road permit respect to the above listed
              items and should be allowed free passage and hence protected from
              any road abuse, touting, illegal block, unlawful delay, harassment
              by any other State Agent Nationwide.
            </p>

            <div className={style.emblem_receipt_footer_signature}>
              <p>Executive Chairman</p>
              <p>Abia State Internal Revenue Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTransportEmblemReceipt;
