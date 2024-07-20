import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbCameraPlus } from "react-icons/tb";
import Webcam from "react-webcam";

const FaceCam: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [base64URL, setBase64URL] = useState<string>("");
  const [isFaceDetected, setIsFaceDetected] = useState<boolean | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
      setBase64URL(imageSrc);
      verifyFace(imageSrc);
    }
  };

  const verifyFace = async (imageSrc: string) => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/verify-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageSrc }),
      });
      const result = await response.json();
      toast.success(result.isFace ? "Face detected!" : "No face detected!");
      setIsFaceDetected(result.isFace);
    } catch (error) {
      toast.error("Error detecting face");
      setIsFaceDetected(null);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImageSrc(null);
    setMessage("");
    setBase64URL("");
    setIsFaceDetected(null);
  };

  return (
    <div className="identity-form_image">
      <div className="identity-form_imagecapture">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <button onClick={capture} className="button primary">
        <TbCameraPlus /> Capture{" "}
      </button>
      {imageSrc && (
        <>
          <div className="identity-form_imagecapture">
            <img src={imageSrc} alt="Captured face" />
          </div>
          <button onClick={reset} className="button primary">
            Retry
          </button>
        </>
      )}
      {isLoading && <p>Loading...</p>}
      {/* {message && <p>{message}</p>} */}
      {/* {base64URL && (
        <div>
          <p>Base64 URL:</p>
          <textarea rows={5} cols={50} readOnly value={base64URL} />
        </div>
      )} */}
      {isFaceDetected !== null && (
        <div>
          {isFaceDetected ? (
            <p style={{ color: "green" }}>
              Image detection successful: Face detected!
            </p>
          ) : (
            <p style={{ color: "red" }}>
              Image detection unsuccessful: No face detected!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FaceCam;
