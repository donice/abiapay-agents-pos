"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./style.scss";
import ProgressCircle from "@/src/components/common/progrees-circle";

const TicketsLayout = ({ children }: { children: React.ReactNode }) => {
  const steps = [
    "/tickets/transport/add",
    "/tickets/transport/add/summary",
    "/tickets/transport/add/pay"
  ];

  const pathname = usePathname();
  const [progressPerPage, setProgressPerPage] = useState(0);

  useEffect(() => {
    const stepIndex = steps.indexOf(pathname);
    if (stepIndex !== -1) {
      setProgressPerPage(Math.round((100 / steps.length) * (stepIndex + 1)));
    }
  }, [pathname]);

  return (
    <section className="transport_add_layout">
      <div className="transport_add_layout_progress">
        <ProgressCircle percentage={progressPerPage} /> 
      </div>
      
      {children}
    </section>
  );
};

export default TicketsLayout;
