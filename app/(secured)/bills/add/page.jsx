import React from "react";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";
import CreateBillModule from "@/src/components/modules/bills/add";
import { GoBackButton } from "@/src/components/common/button";
export var metadata = {
    title: "Create Bill",
    description: "Agents Portal Create Bill Page",
};
var CreateBillPage = function () {
    return (<div className="billspage">
      <GoBackButton />
      <CustomHeader title="Create Bill" desc={"Select bill type to create"}/>
      <CreateBillModule />
    </div>);
};
export default CreateBillPage;
