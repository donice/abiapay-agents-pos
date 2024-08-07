import React from "react";
import { useRouter } from "next/navigation";
import { FcDeleteDatabase, FcAcceptDatabase, FcOk } from "react-icons/fc";
import "./style.scss";
import { Button, PrimaryButton, SecondaryButton } from "../button";
import { AbiaEnumerationLarge } from "../Images";
import { TbPrinter, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import QRCode from "react-qr-code";
import { LuMailCheck } from "react-icons/lu";

interface SuccessModalProps {
  maintext?: string;
  id?: string;
  text?: string;
  link?: string;
  onClick?: any;
}

interface EmailSuccessModalProps {
  text?: string;
  id?: string;
  message?: string;
  link?: string;
  buttonText: string;
  onClick: any;
}

interface EnumerationModalProps {
  qr_link: string;
  id?: string;
  text?: string;
  link?: string;
  plate_number?: string;
  vehicle_category?: string;
}

interface InfoModalType {
  button_text?: string;
  text_header?: string;
  text_info?: string;
  link?: string;
  status: "success" | "error";
}

interface VehicleCheckSuccessModalType {
  text_header?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  state_of_registration?: string;
  expiry_date?: string;
  button_text?: string;
  onClick?: ((event: any) => void) | undefined;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  maintext,
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
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary top">
              {text}
            </button>
          )}

          <SecondaryButton text="Create New" link={"/tickets/transport"} />
        </div>
      </div>
    </div>
  );
};
export const ChangePasswordModal: React.FC<SuccessModalProps> = ({
  maintext,
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
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary top">
              {text}
            </button>
          )}

          {/* <SecondaryButton text="Create New" link={"/settings"} /> */}
        </div>
      </div>
    </div>
  );
};

export const EmailSuccessModal: React.FC<EmailSuccessModalProps> = ({
  text,
  // id,
  message,
  // link,
  buttonText,
  onClick,
}) => {
  const router = useRouter();

  return (
    <div className="modalOverlay">
      <div className="modal">
        <LuMailCheck className="success_icon" />
        <div className="modalContent">
          <h2>{text ? text : "Email Delievered"} </h2>
          <p>{message ? message : "Email has been sent successfully"} </p>
          <button onClick={onClick} className="button primary top">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const EmblemModal = ({
  maintext,
  exp_date,
  payment_ref,
  button_text,
  onClick,
}: {
  maintext?: string;
  exp_date?: string;
  payment_ref?: string;
  text?: string;
  button_text?: string;
  onClick?: any;
}) => {

  return (
    <div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon" />
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            Payment Reference: <span>{payment_ref ? payment_ref : ""}</span>{" "}
          </p>
          <p>
            Expiration Date: <span>{exp_date ? exp_date : ""}</span>{" "}
          </p>
            <button onClick={onClick} className="button primary top">
              {button_text}
            </button>

          <SecondaryButton text="Create New Emblem" link="/tickets/transport" />
        </div>
      </div>
    </div>
  );
};

export const OffloadingModal = ({
  maintext,
  payment_ref,
  button_text,
  onClick,
}: {
  maintext?: string;
  payment_ref?: string;
  text?: string;
  button_text?: string;
  onClick?: any;
}) => {

  return (
    <div className="modalOverlay">
      <div className="modal">
        <FcOk className="success_icon" />
        <div className="modalContent">
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            Payment Reference: <span>{payment_ref ? payment_ref : ""}</span>{" "}
          </p>
            <button onClick={onClick} className="button primary top">
              {button_text}
            </button>

          <SecondaryButton text="Register New Loading/Offloading" link="/tickets/transport/loading_offloading" />
        </div>
      </div>
    </div>
  );
};
export const EnumerationModal: React.FC<SuccessModalProps> = ({
  maintext,
  id,
  text,
  link,
  onClick,
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
          <h2>{maintext ? maintext : "Payment Successful"} </h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary top">
              {text}
            </button>
          )}

          <SecondaryButton text="Create New" link="/enumeration" />
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

export const VehicleCheckSuccessModal: React.FC<
  VehicleCheckSuccessModalType
> = ({
  text_header,
  vehicle_make,
  vehicle_model,
  vehicle_color,
  state_of_registration,
  expiry_date,
  button_text,
  onClick,
}) => {
  const handleClick = () => {};
  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modal_icon">
          <TbRosetteDiscountCheckFilled className="success_icon" />
        </div>

        <div className="modalContent">
          <h2>{text_header}</h2>
          <div className="vehicle_items">
            <p>
              Vehicle Make:
              <span>{vehicle_make} </span>
            </p>
            <p>
              Vehicle Model:
              <span>{vehicle_model}</span>{" "}
            </p>
            <p>
              Vehicle Color:
              <span>{vehicle_color}</span>{" "}
            </p>
            <p>
              State Of Registration:
              <span>{state_of_registration}</span>{" "}
            </p>
            <p>
              Registration Expiry Date:
              <span>{expiry_date}</span>{" "}
            </p>
          </div>

          <Button onClick={onClick} text={button_text ? button_text : ""} />
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
  vehicle_category,
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
      <div className="modal" id="enumeration_modal">
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

            <div className="qr_container">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qr_link}
                viewBox={`0 0 256 256`}
              />
            </div>

            <p className="vehicle_type">{vehicle_category}</p>
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
          <SecondaryButton text="Create New" link={"/enumeration"} />
          <PrimaryButton text={"Done"} link={"/dashboard"} />
        </div>
      </div>
    </div>
  );
};
