import React from 'react';
// import "./style.scss" // Moved to _app;
var BusinessAbssinStatsCard = function (_a) {
    var _b;
    var data = _a.data;
    console.log(data, "busness data");
    return (<div className="identity-stats">
    <h2>Total Business ABSSINs</h2>
    <p>{(_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length} <span className="sub-text">Business ABSSINs created</span></p>
  </div>);
};
export default BusinessAbssinStatsCard;
