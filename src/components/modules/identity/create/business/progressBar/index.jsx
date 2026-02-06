import React from "react";
var ProgressBar = function (_a) {
    var stage = _a.stage, setStage = _a.setStage;
    var getProgressWidth = function () {
        return "".concat((stage + 1) * 25, "%");
    };
    return (<div className="progress">
      <div className="progress-container">
        <div className="progress-line">
          <div className="progress-bar" style={{ width: getProgressWidth() }}></div>
          <div className={"progress-label ".concat(stage >= 0 ? "active" : "")} style={{ left: "10%" }}>
            Basic
          </div>
          <div className={"progress-label ".concat(stage >= 1 ? "active" : "")} style={{ left: "35%" }}>
            Business
          </div>
          <div className={"progress-label ".concat(stage >= 2 ? "active" : "")} style={{ left: "60%" }}>
            Address
          </div>
          <div className={"progress-label ".concat(stage >= 3 ? "active" : "")} style={{ left: "85%" }}>
            Summary
          </div>
        </div>
       
      </div>
    </div>);
};
export default ProgressBar;
