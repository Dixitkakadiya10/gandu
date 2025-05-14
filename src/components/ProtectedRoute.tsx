
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: string;
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const userRole = userData?.role || "";

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If role is specified and user doesn't have that role, redirect to appropriate page
  if (allowedRole && userRole !== allowedRole) {
    if (userRole === "chef") {
      return <Navigate to="/chef" />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/customer" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
