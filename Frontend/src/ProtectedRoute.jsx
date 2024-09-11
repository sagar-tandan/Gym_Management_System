import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/adminlogin" />;
  }
  // If token exists, render the children (AdminPage)
  return children;
};

export default ProtectedRoute;
