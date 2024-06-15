import { RotatingLines } from "react-loader-spinner";

import React from "react";

const Loader = () => {
  return (
    <div>
      <RotatingLines
        visible={true}
        width="22"
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;
