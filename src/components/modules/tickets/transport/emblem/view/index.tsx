import { CustomHeader } from "@/src/components/common/header";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import style from "./style.module.scss";
import QRCode from "react-qr-code";

import abiaLogo from "@/public/logos/emblem/abia_@33.jpg";
import coaLogo from "@/public/logos/emblem/coat_of_arm.png";
import jtb from "@/public/logos/emblem/jtb.png";
import useIsBrower from "@/src/hooks/useIsBrower";
import { Button } from "@/src/components/common/button";
import html2canvas from "html2canvas"

const ViewTransportEmblemReceipt = ({
  plate_no,
  payment_ref,
}: {
  plate_no: string;
  payment_ref: string;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [data, setUserData] = useState({
    product_code: "",
  });

  useEffect(() => {
    if (useIsBrower()) {
      const data = window.sessionStorage.getItem("TRANSPORT_INVOICE");
      if (data) {
        try {
          setUserData(JSON.parse(data));
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          setUserData({
            product_code: "",
          });
        }
      }
    }
  }, []);
  const handleDownload = async () => {
    if (!componentRef.current) return;

    try {
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        logging: true,
        useCORS: true,
        allowTaint: true,
        onclone: (document) => {
          // Ensure images are loaded
          const images = document.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            img.crossOrigin = 'anonymous';
          });
        }
      });
      const imgData = canvas.toDataURL('image/png');

      // Import jsPDF dynamically to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`emblem_cert_${payment_ref}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <CustomHeader
        title={"Emblem Receipt"}
        desc="View Transport Emblem Receipt"
      />
      <section
        className={style.emblem}
        id="tickets-summary-comp"
        ref={componentRef}
      >
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
            <ul className={style.emblem_receipt_clearance_list}>
              <li>1. Board of Internal Revenue (Hackney Carriage)</li>
              <li>2. Sanitation Sticker/Pollution/Effluent Discharge/Emission Control</li>
              <li>3. MOT Sticker</li>
              <li>4. Haulage Permit</li>
              <li>5. Safety Emblem</li>
              <li>6. Natural Freight</li>
              <li>7. Commodity Sticker</li>
              <li>8. Loading and Off Loading</li>
              <li>9. Route/Inter State/Road Tax Warrant Permit</li>
              <li>10. Ogepa Sticker</li>
              <li>11. Agric Levy</li>
              <li>12. Federal Ocean Terminal</li>
              <li>13. Airport</li>
              <li>14. Mid-Year Sticker</li>
              <li>15. ASPIMSS Yearly Safety Clearance</li>
            </ul>
          </div>

          <div className={style.emblem_receipt_footer}>
            <p className={style.emblem_receipt_footer_text}>
              This is to certify that the vehicle with this sticker has
              satisfied every lawful road permit with respect to the above
              listed items and should be allowed free passage and hence
              protected from any road abuse, touting, illegal block, unlawful
              delay, harassment by any other State Agent Nationwide.
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
      </section>{" "}
      <Button text="Download Certificate" onClick={handleDownload} />
    </div>
  );
};

export default ViewTransportEmblemReceipt;
