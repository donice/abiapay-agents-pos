import { CustomHeader } from "@/src/components/common/header";
import React from "react";
import CreateEmblemForm from "./form";

const TransportEmblemComponent = () => {
  return (
    <div>
      <CustomHeader
        title="Transport Emblem"
        desc="Create Transport Emblem"
      />

      <CreateEmblemForm />
    </div>
  );
};

export default TransportEmblemComponent;
