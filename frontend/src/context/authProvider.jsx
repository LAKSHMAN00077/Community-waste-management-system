import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.data.user) {
        console.log("fetched user :  ", res.data.user);
        setCurrentUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        throw new Error("No user data");
      }
    } catch (err) {
      console.error("Session check failed:", err);
      setCurrentUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    
    // Set up periodic session checking (every 5 minutes)
    const interval = setInterval(fetchUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setCurrentUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      loading, 
      setCurrentUser, 
      logout,
      fetchUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};