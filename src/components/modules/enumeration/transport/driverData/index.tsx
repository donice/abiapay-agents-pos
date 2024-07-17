import { Button } from "@/src/components/common/button";
import React from "react";

const DriverData = ({ setStage }: any) => {
  return (
    <div>
      DriverData
      <Button onClick={() => setStage(3)} text="Enumerate" />
    </div>
  );
};

export default DriverData;
