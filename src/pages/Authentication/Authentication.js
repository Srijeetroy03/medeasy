import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./Authentication.css";
import { useNavigate, useLocation } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (localStorage.getItem("userInfo") !== null) {
      navigate("/");
    } else
      (pathname === "/user-authentication" ||
        pathname === "/user-authentication/") &&
        navigate("/user-authentication/login");
  }, []);
  return (
    <div className="flex flex-col md:w-1/2 items-center justify-center container">
      <Outlet />
    </div>
  );
}

export default Authentication;
