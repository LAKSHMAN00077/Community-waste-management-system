import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading, fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <p>Loading session...</p>
    </div>;
  }

  return currentUser ? children : null;
};

export default ProtectedRoute;