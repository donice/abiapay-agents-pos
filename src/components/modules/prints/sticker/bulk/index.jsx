import React, { useEffect, useState } from "react";
// import "./style.css" // Moved to _app;
import { QRCodeSVG } from "qrcode.react";
var BulkComp = function (_a) {
    var bulkData = _a.bulkData, stickerLga = _a.stickerLga;
    var _b = useState([]), displayData = _b[0], setDisplayData = _b[1];
    useEffect(function () {
        if (bulkData) {
            setDisplayData(bulkData);
        }
    }, [bulkData]);
    if (!displayData || displayData.length === 0) {
        return <div>No data available</div>;
    }
    return (<div className="bulk-sticker">
      {displayData.map(function (data, idx) { return (<div key={idx} className="card">
          <span className="card-lga">{data.Park}</span>
          <span className="card-plate_no">{data === null || data === void 0 ? void 0 : data.PlateNumber}</span>
          <span className="card-cat">{data === null || data === void 0 ? void 0 : data.IncomeCategory}</span>
          <span className="card-income">{data === null || data === void 0 ? void 0 : data.IncomeCategory}</span>
          <span className="card-enum">{data === null || data === void 0 ? void 0 : data.EnumerationID}</span>
          <span className="card-tag">{data === null || data === void 0 ? void 0 : data.productTag}</span>
          <span className="card-asset_code">{data === null || data === void 0 ? void 0 : data.assetCode}</span>
          <div className="card-content">
            <QRCodeSVG style={{ width: 190, height: 190 }} className="qrcode" value={"https://abiapay.com/verify-asset?assetCode=".concat(data === null || data === void 0 ? void 0 : data.assetCode, "&enum=").concat(data === null || data === void 0 ? void 0 : data.EnumerationID)}/>
          </div>
        </div>); })}
    </div>);
};
export default BulkComp;
