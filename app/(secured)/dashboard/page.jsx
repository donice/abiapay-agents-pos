import React from "react";
import DashbaordComponent from "@/src/components/modules/dashboard";
import DashboardBanner from "@/src/components/modules/dashboard/banner";
export var metadata = {
    title: "Agents Portal - Dashbaord",
    description: "Abia Pay for Agents Portal Dashboard",
};
var Dashboard = function () {
    return (<div>
      <DashbaordComponent />
      <DashboardBanner />
    </div>);
};
export default Dashboard;
