import React, { useEffect, useState } from "react";

interface PopupProps {
  message: string;
  show: boolean;
  type: "success" | "error";
  onClose: () => void;
}

const CustomPopup: React.FC<PopupProps> = ({ message, show, type, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        onClose(); 
      }, 2500);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div className={`popup-container ${type === "error" ? "error" : "success"}`}>
      <div className="popup-message">{message}</div>
    </div>
  );
};

export default CustomPopup;
