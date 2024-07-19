import React from "react";
import { useRouter } from "next/navigation";
import { FcDeleteDatabase, FcAcceptDatabase, FcOk } from "react-icons/fc";
import "./style.scss";
import { PrimaryButton, SecondaryButton } from "../button";
import { AbiaEnumerationLarge } from "../Images";
import { TbPrinter } from "react-icons/tb";
import QRCode from "react-qr-code";

interface SuccessModalProps {
  id?: string;
  text?: string;
  link?: string;
}

interface EnumerationModalProps {
  qr_link: string;
  id?: string;
  text?: string;
  link?: string;
  plate_number?: string;
}

interface InfoModalType {
  button_text?: string;
  text_header?: string;
  text_info?: string;
  link?: string;
  status: "success" | "error";
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  id,
  text,
  link,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon" />
        <div className="modalContent">
          <h2>Payment Successful</h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary">
              {text}
            </button>
          )}

          <SecondaryButton text="Create New" link={"/tickets/transport/add"} />
        </div>
      </div>
    </div>
  );
};
export const InfoModal: React.FC<InfoModalType> = ({
  text_info,
  text_header,
  button_text,
  link,
  status,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        {status === "success" ? (
          <FcAcceptDatabase className="success_icon" />
        ) : (
          <FcDeleteDatabase className="error_icon" />
        )}
        <div className="modalContent">
          <h2>{text_header}</h2>
          <p>
            <span>{text_info ? text_info : ""}</span>{" "}
          </p>
          {link && (
            <PrimaryButton link={link} text={button_text ? button_text : ""} />
          )}

          {/* <SecondaryButton text="Create New" link={"/tickets/transport/add"} /> */}
        </div>
      </div>
    </div>
  );
};

export const EnumerationSuccessModal: React.FC<EnumerationModalProps> = ({
  id,
  text,
  link,
  qr_link,
  plate_number,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <AbiaEnumerationLarge />
        <div className="modalHeader">
          <h1>ABIA STATE GOVERNMENT</h1>
          <h2> MINISTRY OF TRANSPORT</h2>
          <h3>ENUMERATION</h3>
        </div>
        <div className="modalContentEnum"></div>
        <div className="modalContentEnumContent">
          <p className="assetCode">{text}</p>
          <div className="custom_vehicle_details">
            <p className="vehicle_cat">COMMERCIAL VEHICLE</p>
            {/* <img
              src="https://i.pinimg.com/564x/a8/69/40/a86940a4ed8a69539b341f3c414c47b3.jpg"
              alt=""
            /> */}

            <div className="qr_container">
              <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qr_link}
              viewBox={`0 0 256 256`}
            />
            </div>

            
            <p className="vehicle_type">MINI BUS TAXI</p>
          </div>

          <div>
            <p className="abssin_no">{id}</p>
            <span className="plate_number_title">PLATE NUMBER</span>
            <p className="plate_number">{plate_number}</p>
          </div>
        </div>
        <div className="btn-container">
          {/* <button className="button secondary">
            <TbPrinter /> Share
          </button> */}
          <SecondaryButton text="Create New" link={"/enumeration/transport"} />
          <PrimaryButton text={"Done"} link={"/dashboard"} />
        </div>
      </div>
    </div>
  );
};
