import React from "react";
import { useRouter } from "next/navigation";
import tick from "../../assets/success-tick.gif";
import Image from "next/image";
import "./style.scss";
import { Button } from "../button";

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
        <Image src={tick} width={400} alt="Success" />
        <div className="modalContent">
          <h2>Tranaction Success</h2>
          <p>
            Payment <span>{id ? "for " + id : ""}</span> is successful{" "}
          </p>
          {/* {text && <p>{text}</p>} */}
          {link && (
            <button onClick={handleClick} className="button primary">
              {text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
