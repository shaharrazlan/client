import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (data: { FullName: string; Email: string; PasswordHash: string }) => {
  try {
    console.log("📤 Sending Register Request:", data);
    const response = await axios.post(`${API_URL}/register`, data);
    console.log("✅ Register Response:", response.data);
    return true;
  } catch (error) {
    console.error("Registration failed", error);
    return false;
  }
};

export const login = async (data: { Email: string; Password: string }) => {
  try {
    console.log("📤 Sending Login Request:", data);
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("✅ Login Response:", response.data);
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const fetchUser = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:5210/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ User Data Retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
};
