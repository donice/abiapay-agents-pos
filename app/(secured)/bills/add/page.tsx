import React, { ReactElement } from "react";
import { Metadata } from "next";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";
import CreateBillModule from "@/src/components/modules/bills/add";

export const metadata: Metadata = {
  title: "Create Bill",
  description: "Agents Portal Create Bill Page",
};

const CreateBillPage = () => {
  return (
    <div className="billspage">
      <CustomHeader title="Create Bill" desc={"Select bill type to create"} />
      <CreateBillModule />
    </div>
  );
};

export default CreateBillPage;
