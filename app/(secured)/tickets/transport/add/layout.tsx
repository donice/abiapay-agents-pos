import React from "react";
import "./style.scss";
import ProgressCircle from "@/src/components/common/progrees-circle";

const TicketsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="transport_add_layout">
      <div className="transport_add_layout_progress">
        <ProgressCircle percentage={35} /> 
      </div>
      
      {children}
    </section>
  );
};

export default TicketsLayout;
