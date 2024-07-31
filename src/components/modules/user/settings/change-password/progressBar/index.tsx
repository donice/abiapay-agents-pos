import React from "react";

const ProgressBar = ({ stage, setStage }: any) => {
  const getProgressWidth = () => {
    return `${(stage + 1) * 33.33}%`;
  };
  return (
    <div className="progress">
      <div className="progress-container">
        <div className="progress-line">
          <div
            className="progress-bar"
            style={{ width: getProgressWidth() }}
          ></div>
          <div
            className={`progress-label ${stage >= 0 ? "active" : ""}`}
            style={{ left: "10%" }}
          >
            Confirm Email
          </div>
          <div
            className={`progress-label ${stage >= 1 ? "active" : ""}`}
            style={{ left: "40%" }}
          >
           Validate OTP
          </div>
          <div
            className={`progress-label ${stage >= 1 ? "active" : ""}`}
            style={{ left: "73%" }}
          >
            Change Password
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default ProgressBar;
