import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  // Redirect to login if no user is found
  if (!user) {
    console.warn("⚠️ No user found, redirecting to login...");
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 text-center">
        <h1 className="text-primary mb-3">Welcome, {user.fullName}!</h1>
        <p className="text-muted">Email: {user.email}</p>
        <button onClick={logout} className="btn btn-danger mt-3 w-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
