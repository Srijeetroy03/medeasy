import React, { useEffect } from "react";
import LogoutBtn from "./LogoutBtn";
import { useNav } from "../../context/NavContext";
import "../../styles/navMenu.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../images/avatar.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchIcon from "@mui/icons-material/Search";

function NavMenu() {
  const { navOpen, toggleNav, toggleSearchBar } = useNav();
  const { userInfo } = useSelector((state) => state.userAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (navOpen) toggleNav();
  }, [pathname]);

  return (
    <>
      <div
        className={`w-full flex flex-col md:flex-row items-center justify-center font-poppins md:justify-end gap-4 overflow-hidden text-gray-400 ${
          !navOpen ? "box-height-0" : "box-height-full"
        }`}
      >
        {pathname !== "/" &&
          pathname !== "/home" &&
          pathname.includes("blog") && (
            <button
              onClick={() => toggleSearchBar()}
              title="Search"
              className="text-gray-400"
            >
              <SearchIcon />
            </button>
          )}
        <NavLink
          title="Find Hospitals Near You"
          onClick={() => toggleNav()}
          to={"/map"}
        >
          Find Hospital
        </NavLink>
        <NavLink
          title="Explore Doctors"
          onClick={() => toggleNav()}
          to={"/doctor"}
        >
          Doctors
        </NavLink>
        <NavLink title="Blog" onClick={() => toggleNav()} to={"/blog"}>
          Blog
        </NavLink>
        {!userInfo?.username && (
          <NavLink
            title="Login"
            onClick={() => toggleNav()}
            to={"/user-authentication/login"}
          >
            Login
          </NavLink>
        )}
        {userInfo?.username && (
          <>
            <NavLink
              title="Appointment"
              onClick={() => toggleNav()}
              to={`/appointments`}
            >
              Appointment
            </NavLink>
            {userInfo?.role === "Doctor" && (
              <NavLink
                title="Add New Blog"
                onClick={() => toggleNav()}
                to={"/add"}
              >
                Add
              </NavLink>
            )}
            <NavLink
              title="Profile"
              onClick={() => toggleNav()}
              to={`${userInfo?.role === "Doctor" ? "doctor" : ""}/profile/${
                userInfo?._id
              }`}
            >
              <img
                className="rounded-full w-8 h-8 hidden md:flex object-cover"
                src={userInfo?.img || Avatar}
              />
              <span className="md:hidden">Profile</span>
            </NavLink>
            <LogoutBtn />
          </>
        )}
      </div>
    </>
  );
}

export default NavMenu;
