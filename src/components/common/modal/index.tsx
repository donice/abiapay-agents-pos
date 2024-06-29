import React from "react";
import { useRouter } from "next/navigation";
import { FcOk } from "react-icons/fc";
import tick from "../../assets/success-tick.gif";
import Image from "next/image";
import "./style.scss";
import { SecondaryButton } from "../button";

interface ModalProps {
  id?: string;
  text?: string;
  link?: string;
}

const SuccessModal: React.FC<ModalProps> = ({ id, text, link }) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
      <FcOk className="success_icon"/>
        <div className="modalContent">
          <h2>Payment Successful</h2>
          <p>
             <span>{id ? id : ""}</span> {" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary">
              {text}
            </button>
          )}

          <SecondaryButton text="Create New" link={"/tickets/transport/add"}/>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
