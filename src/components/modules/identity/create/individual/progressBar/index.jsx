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
          <div className={"progress-label ".concat(stage >= 0 ? "active" : "")} style={{ left: "12.5%" }}>
            Personal Data
          </div>
          <div className={"progress-label ".concat(stage >= 1 ? "active" : "")} style={{ left: "44.33%" }}>
            User Data
          </div>
          <div className={"progress-label ".concat(stage >= 2 ? "active" : "")} style={{ left: "78.66%" }}>
            Origin Data
          </div>
        </div>
        {/* <div className="button-container">
          <button
            onClick={() => setStage(stage > 0 ? stage - 1 : 0)}
            disabled={stage === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setStage(stage < 2 ? stage + 1 : 2)}
            disabled={stage === 2}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>);
};
export default ProgressBar;
