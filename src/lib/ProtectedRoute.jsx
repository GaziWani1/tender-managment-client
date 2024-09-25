// PrivateRoute.js (for React Router v6)
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserPennel from "../pages/UserPennel";

// Mock function to check if the user is authenticated (replace with actual logic)
const isAuthenticated = () => localStorage.getItem('token') ? localStorage.getItem('token') : null;

const PrivateRoute = () => {
  return isAuthenticated() ? <UserPennel /> : <Navigate to="/login" />;
};

export default PrivateRoute;
