import React from "react";
import { useRouter } from "next/navigation";
import { FcOk } from "react-icons/fc";
import "./style.scss";
import { SecondaryButton } from "../button";
import { TbMailbox, TbMailboxOff } from "react-icons/tb";

interface SuccessModalProps {
  id?: string;
  text?: string;
  link?: string;
}

interface InfoModal {
  id?: string;
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
export const InfoModal: React.FC<InfoModal> = ({
  id,
  text_header,
  text_info,
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
        {
          status === "success" ? <TbMailbox className="error_icon" /> : <TbMailboxOff className="success_icon" />
        }
        <div className="modalContent">
          <h2>{text_header}</h2>
          <p>
            <span>{id ? id : ""}</span>{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary">
              {text_info}
            </button>
          )}

          <SecondaryButton text="Create New" link={"/tickets/transport/add"} />
        </div>
      </div>
    </div>
  );
};
