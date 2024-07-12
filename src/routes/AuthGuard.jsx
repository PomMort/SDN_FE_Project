import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, selectAuth, selectToken } from "../slices/auth.slice";
import { notification } from "antd";

const AuthGuard = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const auth = useSelector(selectAuth);
  const exp = auth?.exp; //1720494150
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

    if (exp && exp < currentTime) {
      dispatch(logout());
      notification.error({
        message: "Session Expired",
        description: "Your session has expired. Please log in again.",
      });
    }
    if (!token) {
      navigate("/login");
    }
  }, [exp, dispatch, navigate, token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
