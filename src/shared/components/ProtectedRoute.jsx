import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the protected component
  return children;
};

export default ProtectedRoute;