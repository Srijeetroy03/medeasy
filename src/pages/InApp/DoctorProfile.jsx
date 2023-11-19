import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getProfileBlogsFromDb } from "../../redux/actions/GetAllBlogs";
import BlogList from "../../components/BlogList";
import Avatar from "../../images/avatar.png";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditProfile from "../../components/EditProfile";
import { getDoctorInfo } from "../../redux/actions/docActions";
import BookAppointmentClient from "../../components/BookAppointmentClient";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CallIcon from "@mui/icons-material/Call";

function DoctorProfile() {
  const [show, setShow] = useState(false);
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const { id } = useParams();
  const profileRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userAuth);
  const { doctorInfo } = useSelector((state) => state.doctor);
  const {
    blogList,
    profileBlogListLoading,
    profileBlogListError,
    blogListLoading,
    profileBlogList,
  } = useSelector((state) => state.blog);
  const [showAppointmentMenu, setShowAppointmentMenu] = useState(false);

  console.log(profileBlogList);
  useEffect(() => {
    if (pathname.includes("doc")) dispatch(getDoctorInfo(id));
    if (pathname.includes("profile")) dispatch(getProfileBlogsFromDb(id));
  }, []);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  console.log(doctorInfo);

  const profileHead = document.getElementById("profileHead");

  profileHead &&
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 120) {
        profileHead && profileHead.classList.add("md:top-12", "top-0");
        profileHead && profileHead.classList.remove("-top-16");
      } else {
        profileHead && profileHead.classList.add("-top-16");
        profileHead && profileHead.classList.remove("md:top-12", "top-0");
      }
    });

  const handleAppointment = () => {
    if (userInfo === null) {
      alert("Please login to book an appointment");
      navigate("/user-authentication/login");
    } else {
      console.log("booking appointment");
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <EditProfile show={show} handleShow={handleShow} />
      <div className="flex flex-col w-full flex-wrap font-poppins py-8">
        <div
          id="profileHead"
          ref={profileRef}
          className="w-full fixed gap-4 left-0 px-2 md:px-16 py-2 -top-16 md:pt-4 h-16 bg-white border-b-2 border-gray-100 items-center md:items-center overflow-hidden object-center flex flex-row transition-all z-10"
        >
          <img
            draggable={false}
            src={
              id === doctorInfo?._id
                ? doctorInfo?.img || Avatar
                : (profileBlogList && profileBlogList[0]?.author?.img) || Avatar
            }
            className="h-12 md:h-full object-cover rounded-full p-0"
            style={{ aspectRatio: 1 / 1 }}
          />
          <div className="font-poppins flex flex-col w-full">
            <h2 className="text-md font-bold flex w-full items-center justify-between gap-2">
              {id === doctorInfo?._id
                ? doctorInfo?.name
                : profileBlogList && profileBlogList[0]?.author?.name}{" "}
              {userInfo?._id === id && !show && (
                <button
                  onClick={handleShow}
                  className="p-1 bg-gray-200 shadow-lg rounded-full flex items-center justify-center"
                >
                  <EditRoundedIcon sx={{ fontSize: "16px" }} />
                </button>
              )}
            </h2>
            <p className="text-xs text-gray-500">
              @
              {id == doctorInfo?._id
                ? doctorInfo?.username
                : profileBlogList && profileBlogList[0]?.author?.username}
            </p>
          </div>
        </div>
        <div className="w-full h-full md:h-full items-center md:items-start overflow-hidden object-center flex flex-col md:flex-row">
          <div className="relative rounded-full" style={{ zIndex: 0 }}>
            <img
              draggable={false}
              src={
                id === doctorInfo?._id
                  ? doctorInfo?.img || Avatar
                  : (profileBlogList && profileBlogList[0]?.author?.img) ||
                    Avatar
              }
              className="h-48 md:h-60 object-cover rounded-full p-0"
              style={{ aspectRatio: 1 / 1, zIndex: 0 }}
            />
            {userInfo?._id === id && !show && (
              <button
                onClick={handleShow}
                style={{ zIndex: 5 }}
                className="p-2 absolute bottom-5 right-5 bg-gray-200 shadow-xl cursor-pointer rounded-full flex items-center justify-center"
              >
                <EditRoundedIcon />
              </button>
            )}
          </div>
          <div className="font-poppins py-8  md:p-8 flex flex-col gap-4 items-center text-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-extrabold flex gap-4">
              {(pathname.includes("doctor") || doctorInfo?.role === "Doctor") &&
                "Dr. "}
              {id === doctorInfo?._id
                ? doctorInfo?.name
                : profileBlogList && profileBlogList[0]?.author?.name}
            </h2>
            {(pathname.includes("doctor") || doctorInfo?.role === "Doctor") && (
              <>
                {doctorInfo?.speciality && doctorInfo?.experience && (
                  <div className="flex items-center gap-2">
                    <h4>
                      {id == doctorInfo?._id
                        ? doctorInfo?.speciality
                        : profileBlogList &&
                          profileBlogList[0]?.author?.speciality}
                    </h4>
                    <h4 className="font-extrabold text-2xl">·</h4>
                    <h4>
                      {id == doctorInfo?._id
                        ? doctorInfo?.experience
                        : profileBlogList &&
                          profileBlogList[0]?.author?.experience}{" "}
                      Years of Experience
                    </h4>
                  </div>
                )}
                {doctorInfo?.degree && (
                  <h4 className="flex flex-wrap gap-2">
                    {doctorInfo?.degree.split(",").map((deg) => (
                      <p className="p-2 rounded-2xl text-sm border border-green-600 w-min">
                        {deg}
                      </p>
                    ))}
                  </h4>
                )}
                {doctorInfo?.address && (
                  <div className="flex gap-2 text-green-600">
                    <FmdGoodOutlinedIcon />
                    <p className="text-black text-start">
                      {doctorInfo?.address}
                      <br></br>
                      {doctorInfo?.city}, {doctorInfo?.state},{" "}
                      {doctorInfo?.country}
                    </p>
                  </div>
                )}
                {doctorInfo?.phone && (
                  <div className="flex gap-2 text-green-600">
                    <CallIcon />
                    <p className="text-black text-start">{doctorInfo?.phone}</p>
                  </div>
                )}
                {doctorInfo?.days && doctorInfo?.timing && (
                  <div className="flex flex-col md:flex-row gap-8">
                    {doctorInfo?.days && (
                      <div className="md:items-start flex flex-col gap-2">
                        <label
                          htmlFor="timing"
                          className="text-gray-600 text-sm font-semibold"
                        >
                          Available Days:
                        </label>
                        <div className="flex items-center gap-1" id="timing">
                          {days.map((day) => (
                            <p
                              className={`rounded-full flex items-center justify-center items-center overflow-hidden border w-10 ${
                                (doctorInfo?.days).filter(
                                  (Day) => Day.trim() == day
                                ).length > 0
                                  ? "text-white bg-green-600"
                                  : "border-gray-400 text-gray-400"
                              }`}
                              style={{ aspectRatio: 1 / 1 }}
                            >
                              <span>{day[0]}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {doctorInfo?.timing?.timeTo &&
                      doctorInfo?.timing?.timeFrom && (
                        <div className="md:items-start flex flex-col gap-2">
                          <label
                            htmlFor="timing"
                            className="text-gray-600 text-sm font-semibold"
                          >
                            Available Timings:
                          </label>
                          <div className="flex items-center gap-2" id="timing">
                            <h4 className="font-bold text-4xl">
                              {doctorInfo?.timing?.timeFrom}{" "}
                              <span className="text-gray-400 text-xl">
                                {(doctorInfo?.timing?.timeFrom.split(":"))[0] >
                                12
                                  ? "PM"
                                  : "AM"}
                              </span>
                            </h4>
                            <h4>-</h4>
                            <h4 className="font-bold text-4xl">
                              {doctorInfo?.timing?.timeTo}{" "}
                              <span className="text-gray-400 text-xl">
                                {(doctorInfo?.timing?.timeTo.split(":"))[0] > 12
                                  ? "PM"
                                  : "AM"}
                              </span>
                            </h4>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </>
            )}
            <p className="text-sm text-gray-500">
              @
              {id == doctorInfo?._id
                ? doctorInfo?.username
                : profileBlogList && profileBlogList[0]?.author?.username}
            </p>
            <p className="text-xs text-gray-500">
              {id == doctorInfo?._id
                ? doctorInfo?.description
                : profileBlogList && profileBlogList[0]?.author?.description}
            </p>
            {userInfo !== null && userInfo?.role !== "Doctor" && (
              <div className="flex flex-col items-start gap-2">
                <button
                  onClick={() => setShowAppointmentMenu(true)}
                  className="rounded bg-green-600 text-white p-2"
                >
                  Book Apointment
                </button>
                {showAppointmentMenu && (
                  <BookAppointmentClient
                    docInfo={doctorInfo}
                    closeMenu={setShowAppointmentMenu}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {profileBlogListLoading && <p>Loading...</p>}
        {/* {blogListError && <p>{blogListError}</p>} */}
        <h2 className="py-8 text-xl font-extrabold">Blogs</h2>
        {!profileBlogListLoading && !blogListLoading && (
          <BlogList blogList={profileBlogList} />
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;
