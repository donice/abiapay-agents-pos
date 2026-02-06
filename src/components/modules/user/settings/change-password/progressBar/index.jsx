import React from "react";
var ProgressBar = function (_a) {
    var stage = _a.stage, setStage = _a.setStage;
    var getProgressWidth = function () {
        return "".concat((stage + 1) * 33.33, "%");
    };
    return (<div className="progress">
      <div className="progress-container">
        <div className="progress-line">
          <div className="progress-bar" style={{ width: getProgressWidth() }}></div>
          <div className={"progress-label ".concat(stage >= 0 ? "active" : "")} style={{ left: "12%" }}>
            Confirm Email
          </div>
          <div className={"progress-label ".concat(stage >= 1 ? "active" : "")} style={{ left: "43%" }}>
           Validate OTP
          </div>
          <div className={"progress-label ".concat(stage >= 1 ? "active" : "")} style={{ left: "76%" }}>
            NewPassword
          </div>
          
        </div>
        
      </div>
    </div>);
};
export default ProgressBar;
