import React, { createContext, useState } from "react";
import { fetchUser } from "../services/api";

interface User {
  fullName: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchAndSetUser: () => Promise<void>; // ✅ Function to update user when needed
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  fetchAndSetUser: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Function to fetch and update the user (only when called)
  const fetchAndSetUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found, skipping user fetch.");
      return;
    }
    
    console.log("🔄 Fetching user data...");
    const userData = await fetchUser(token);
    if (userData) {
      console.log("✅ User fetched successfully:", userData);
      setUser(userData);
    } else {
      console.warn("❌ No user data returned from API.");
    }
  };

  const logout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchAndSetUser, logout }}>
      {children} {/* ✅ No fetching on app load */}
    </AuthContext.Provider>
  );
};
