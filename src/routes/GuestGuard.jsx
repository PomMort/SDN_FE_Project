import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { selectAuth, selectToken } from "../slices/auth.slice";

const GuestGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
