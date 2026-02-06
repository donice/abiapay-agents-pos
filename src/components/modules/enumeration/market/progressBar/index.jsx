import React from "react";
var ProgressBar = function (_a) {
    var stage = _a.stage, setStage = _a.setStage;
    var getProgressWidth = function () {
        return "".concat((stage + 1) * 50, "%");
    };
    return (<div className="progress">
      <div className="progress-container">
        <div className="progress-line">
          <div className="progress-bar" style={{ width: getProgressWidth() }}></div>
          <div className={"progress-label ".concat(stage >= 0 ? "active" : "")} style={{ left: "17%" }}>
            Enumeration Details
          </div>
          <div className={"progress-label ".concat(stage >= 1 ? "active" : "")} style={{ left: "65%" }}>
            Shopkeepers Details
          </div>
          
        </div>
        
      </div>
    </div>);
};
export default ProgressBar;
