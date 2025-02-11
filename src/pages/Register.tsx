import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { register } from "../services/api";
import CustomPopup from "../components/CustomPopup";
import "../styles/Popup.css";
import "../styles/Register.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState(""); 
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState<"success" | "error">("success");

  const handleRegister = async (data: { FullName: string; Email: string; PasswordHash: string }) => {
    
    const success = await register(data);
    if (success) {
      setPopupMessage("✅ Registered Successful!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {showPopup && <CustomPopup message={popupMessage} show={showPopup} type={popupType} onClose={() => setShowPopup(false)} />}
      <div className="card shadow p-4 rounded" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <RegisterForm onSubmit={handleRegister} />
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-primary">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
