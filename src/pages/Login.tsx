import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import CustomPopup from "../components/CustomPopup"; 
import "../styles/Popup.css"; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { fetchAndSetUser } = useContext(AuthContext);
  const [popupMessage, setPopupMessage] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const handleLogin = async (data: { Email: string; Password: string }) => {
    const user = await login(data);
    if (user) {
      setPopupMessage("✅ Login Successful!");
      setPopupType("success");
      setShowPopup(true);
      localStorage.setItem("token", user.access_token);
      await fetchAndSetUser(); 
      setTimeout(() => navigate("/dashboard"), 3000);
    } else {
      setPopupMessage("❌ Invalid username or password!");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
       {showPopup && <CustomPopup message={popupMessage} show={showPopup} type={popupType} onClose={() => setShowPopup(false)} />}
      <div className="card shadow p-4 rounded" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <LoginForm onSubmit={handleLogin} />
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-primary">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
