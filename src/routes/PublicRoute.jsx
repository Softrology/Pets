// components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);

  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated && token && user) {
    switch (user.role) {
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

export default PublicRoute;
