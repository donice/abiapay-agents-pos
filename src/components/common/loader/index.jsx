import { RotatingLines } from "react-loader-spinner";
// import "./style.scss" // Moved to _app
import React from "react";
var Loader = function () {
    return (<div className="loader-div">
      <RotatingLines visible={true} width="22" strokeColor="white" strokeWidth="5" animationDuration="0.75" ariaLabel="rotating-lines-loading"/>
    </div>);
};
export var SmallLoader = function () {
    return (<div className="loader-div">
      <RotatingLines visible={true} width="15" strokeColor="black" strokeWidth="5" animationDuration="0.75" ariaLabel="rotating-lines-loading"/>
    </div>);
};
export var LargeLoader = function () {
    return (<div className="loader-div">
      <RotatingLines visible={true} width="50" strokeColor="green" strokeWidth="5" animationDuration="0.75" ariaLabel="rotating-lines-loading"/>
    </div>);
};
export default Loader;
