import { CustomHeader } from "@/src/components/common/header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./style.module.scss";
import QRCode from "react-qr-code";

import abiaLogo from "@/public/logos/emblem/abia_@33.jpg";
import coaLogo from "@/public/logos/emblem/coat_of_arm.png";
import jtb from "@/public/logos/emblem/jtb.png";
import useIsBrower from "@/src/hooks/useIsBrower";

const ViewTransportEmblemReceipt = ({
  plate_no,
  payment_ref,
}: {
  plate_no: string;
  payment_ref: string;
}) => {

  const [data, setUserData]= useState({
    product_code: ""
  })

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("TRANSPORT_INVOICE");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({
            product_code: ""
          });
        }
      }
    }
  }, []);
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
              <h2>for {data?.product_code} </h2>
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
            This is to certify that the vehicle with this sticker has satisfied every lawful road permit with respect to the above listed items and should be allowed free passage and hence protected from any road abuse, touting, illegal block, unlawful delay, harassment by any other State Agent Nationwide.
            </p>

            <div className={style.emblem_receipt_footer_signature}>
              <p>Executive Chairman</p>
              <p>Abia State Internal Revenue Service</p>
            </div>

            <div className={style.qr_container}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`https://abiapay.com//verify/emblem?=${payment_ref}`}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTransportEmblemReceipt;
