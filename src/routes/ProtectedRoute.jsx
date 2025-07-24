// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);

  // Check if user is authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect based on user role
    switch (user?.role) {
      case "PET_OWNER":
        return <Navigate to="/pet-owner/dashboard" replace />;
      case "VET":
        return <Navigate to="/vet/dashboard" replace />;
      case "SUPER_ADMIN":
        return <Navigate to="/super-admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
