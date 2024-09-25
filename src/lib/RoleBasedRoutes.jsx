import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";

const getUserRole = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
console.log(getUserRole());


const RoleBasedRoute = ({ allowedRoles }) => {
  const user = getUserRole();
  
  if (!user?.role) {
    return <Navigate to="/login" />;
  }

  return allowedRoles.includes(user?.role) ? <AdminDashboard /> : <Navigate to="/login" />;
};

export default RoleBasedRoute;
