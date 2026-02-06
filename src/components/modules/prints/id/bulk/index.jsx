import React, { useEffect, useState } from "react";
// import "./style.scss" // Moved to _app;
import { QRCodeSVG } from "qrcode.react";
var BulkComp = function (_a) {
    var bulkData = _a.bulkData;
    var _b = useState([]), displayData = _b[0], setDisplayData = _b[1];
    useEffect(function () {
        if (bulkData) {
            console.log(bulkData);
            setDisplayData(bulkData);
        }
    }, [bulkData]);
    if (!bulkData) {
        return null;
    }
    return (<div className="bulk-id">
      {displayData === null || displayData === void 0 ? void 0 : displayData.map(function (data, idx) { return (<div className="id-card" key={idx}>
          <div className="left-section">
            <div className="profile-img">
              <img src={data === null || data === void 0 ? void 0 : data.PhotoID} alt="Profile"/>
            </div>

            <div className="enum-row">
            <p className="label">ENUM-ID</p>
            <p className="enumeration-id">{data === null || data === void 0 ? void 0 : data.EnumerationID}</p>
          </div>
          </div>
          <div className="right-section">
            <div className="personal-details">
              <div className="detail">
                <span className="value">{(data === null || data === void 0 ? void 0 : data.surname) || "-"}</span>
              </div>
              <div className="detail">
                <span className="value">{(data === null || data === void 0 ? void 0 : data.first_name) || "-"}</span>
              </div>
              <div className="detail">
                <span className="value">{(data === null || data === void 0 ? void 0 : data.Park) || "-"}</span>
              </div>
              <div className="detail">
                <span className="value">{(data === null || data === void 0 ? void 0 : data.phone_number) || "-"}</span>
              </div>
            </div>
          </div>{" "}


          
          <div className="qr-code ">
            <QRCodeSVG style={{ width: 80, height: 100 }} className="qrcode" value={"https://abiapay.com/verify-asset?assetCode=".concat(data === null || data === void 0 ? void 0 : data.assetCode, "&enum=").concat(data === null || data === void 0 ? void 0 : data.EnumerationID)}/>
          </div>
          <div className="abssin_span">
          <p className="abssin_text">ABSSIN</p>
          <p className="abssin_number"> {data === null || data === void 0 ? void 0 : data.state_id}</p>
          </div>

        </div>); })}
    </div>);
};
export default BulkComp;
