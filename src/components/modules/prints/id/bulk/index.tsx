import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { QRCodeSVG } from "qrcode.react";

const BulkComp = ({ bulkData }: any) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (bulkData) {
      console.log(bulkData);
      setDisplayData(bulkData);
    }
  }, [bulkData]);

  if (!bulkData) {
    return null;
  }

  return (
    <div className="bulk-id">
      {/* {displayData?.map((data: any, idx: number) => (
        <div key={idx} className="card">
          <span className="card-id">{data?.EnumerationID}</span>
          <span className="card-tag">{data?.productTag}</span>
          <div className="card-content">
            <div className="card-content_image">
              <img src={data?.PhotoID} alt={""} width={100} height={100} />
            </div>
            <div className="card-content_text">
              <div className="">
                <p>Surname:</p>
                <p>{data?.surname}</p>
              </div>
              <div className="middle top">
                <p>Others:</p>
                <p>{data?.first_name + " " + data?.middle_name}</p>
              </div>
              <div className="bottom top">
                <p>D.O.B:</p>
                <p>{data?.birth_date}</p>
              </div>
              <div className="bottom top">
                <p>Gender:</p>
                <p>{data?.gender}</p>
              </div>
            </div>

            <div className="card-content_qr">
            <QRCodeSVG style={{width: 90, height: 90}} className="qrcode" value={`https://web.abiapay.com/verify?enum_id=${data?.EnumerationID}`} />,
         </div>
          </div>
        </div>



      ))} */}

      {displayData?.map((data: any, idx: number) => (
        <div className="id-card" key={idx}>
          <div className="left-section">
            <div className="profile-img">
              <img src={data?.PhotoID} alt="Profile" />
            </div>

            <p className="enumeration-id"> {data?.EnumerationID}</p>
          </div>

          <div className="right-section">
            <div className="details">
              <div className="personal-details">
                <div className="detail">
                  <span className="value">{data?.surname}</span>
                </div>
                <div className="detail">
                  <span className="value">{data?.first_name}</span>
                </div>
                <div className="detail">
                  <span className="value">{data?.Park}</span>
                </div>
                <div className="detail">
                  <span className="value">+234 123 456 7890</span>
                </div>
              </div>

              <div className="qr-code ">
                {/* <QRCodeSVG
                  style={{ width: 100, height: 190 }}
                  className="qrcode"
                  value={`https://abiapay.com/verify-asset?assetCode=${data?.assetCode}&enum=${data?.EnumerationID}`}
                /> */}
                <p>ABSSIN</p>
                <p>{data?.state_id}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BulkComp;
