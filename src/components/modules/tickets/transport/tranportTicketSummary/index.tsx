"use client";
import React, { useEffect, useState } from "react";
import { CustomHeader } from "@/src/components/common/header";
import "./style.scss";
import {
  Button,
  BackButton,
  GoBackButton,
} from "@/src/components/common/button";
import { Loading } from "@/src/components/common/loader/redirecting";
import useIsBrower from "@/src/hooks/useIsBrower";
import { CamelCaseToTitleCase } from "@/src/utils/helper";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import SuccessModal from "@/src/components/common/modal";

const TransportTicketsSummaryComponent = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData =
        useIsBrower() && sessionStorage.getItem("TRANSPORT_INVOICE");
      // Correct it
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  const handleSuble = async () => {
    const data =
      useIsBrower() && sessionStorage.getItem("TRANSPORT_INVOICE");

    if (!data) {
      toast.error("Error Creating Ticket");
      return;
    }

    const formData = JSON.parse(data);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/transport/create-ticket`,
        formData
      );

      console.log(formData);

      const response = res?.data;

      if (response.response_code == "00") {
        toast.success(response.response_message);
        setShow(true);

        // router.push("/tickets/transport/add/summary");
      } else if (response.response_code == "74") {
        toast.error(`${response.response_message}`);
        router.push("/tickets/transport");
      }else {
        toast.error(`${response.response_message}, Try again`);
      }
    } catch {
      toast.error("Error Creating Ticket");
    }
  };

  return (
    <section className="tickets">
      <GoBackButton link="/tickets/transport/add" />

      {data ? (
        <div className="tickets-summary-comp">
          <div className="tickets-summary-comp_header">
            <CustomHeader
              title="Transport Ticket Details"
              desc="Comfirm the details for your Ticket Purchase"
            />
          </div>

          <div className="tickets-summary-comp_container">
            <div>
              {Object.entries(data).map(
                ([key, value]: [key: any, value: any]) => (
                  <div key={key} className="line-items">
                    <p>{CamelCaseToTitleCase(key)}:</p>
                    <p>{value}</p>
                  </div>
                )
              )}
            </div>{" "}
          </div>
          <div className="btn_container">
            <BackButton link="/tickets/transport/add" />
            <Button text="Proceed to Payment" onClick={handleSuble} />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {
        show && <SuccessModal text="Go to transport" link="/tickets/transport" />
      }
    </section>
  );
};

export default TransportTicketsSummaryComponent;
