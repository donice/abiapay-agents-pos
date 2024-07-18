import React from "react";
import { useRouter } from "next/navigation";
import { FcDeleteDatabase, FcAcceptDatabase, FcOk } from "react-icons/fc";
import "./style.scss";
import { PrimaryButton, SecondaryButton } from "../button";
import { AbiaEnumerationLarge } from "../Images";

interface SuccessModalProps {
  id?: string;
  text?: string;
  link?: string;
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

export const EnumerationSuccessModal: React.FC<SuccessModalProps> = ({
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
      <div className="modal enumeration">
        <AbiaEnumerationLarge />
        <div className="modalHeader">
          <h1>ABIA STATE GOVERNMENT</h1>
          <h2> MINISTRY OF TRANSPORTATION</h2>
        </div>
        <div className="modalContentEnum">
          <div className="modalContentEnumContent">
             <img src="https://i.pinimg.com/564x/a8/69/40/a86940a4ed8a69539b341f3c414c47b3.jpg" alt="" />
          </div>
         
          

          <div className="btn-container">
            <SecondaryButton
              text="Create New"
              link={"/tickets/transport/add"}
            />
            <PrimaryButton text={"Done"} link={"/dashboard"} />
          </div>
        </div>
      </div>
    </div>
  );
};
