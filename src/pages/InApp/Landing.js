import React, { Suspense, useEffect, useState } from "react";
import BlogCard from "../../components/HomeBlogCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNav } from "../../context/NavContext";
import { getAllBlogsFromDb } from "../../redux/actions/GetAllBlogs";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CallIcon from "@mui/icons-material/Call";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

function Landing() {
  const dispatch = useDispatch();
  const { blogList } = useSelector((state) => state.blog);
  const { userInfo } = useSelector((state) => state.userAuth);
  const { setEmail, email } = useNav();

  useEffect(() => {
    setEmail("");
    dispatch(getAllBlogsFromDb());
  }, []);

  return (
    // entire landing page
    <div className="font-manrope flex flex-col gap-16">
      <section className="flex flex-col md:flex-row w-full items-center pt-4 md:pt-16 justify-between gap-8 md:gap-0">
        <div
          className="flex flex-col gap-4 items-center md:items-start justify-center text-center md:text-left"
          style={{ flexBasis: "50%" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold md:leading-snug md:max-w-[80%]">
            Healthcare Solutions for a Better Life
          </h1>
          <p className=" text-xs md:text-sm md:max-w-[90%] py-4 text-gray-800">
            The word healthcare means different things to different people. Some
            folks might think of their insurance provider and access to medical
            services, others may think of their personal self-care; the health
            of their mental, spiritual, and physical well-being.
          </p>
          <div className="w-[230px] inline-flex items-center justify-center mb-4">
            <Link to={"/map"} id="update-btn" className="relative inline-flex justify-start items-center rounded-full bg-gradient-to-br from-green-500 to-green-600 p-2 pl-4 text-white gap-2">
              <div id="update-text" className="inline-flex gap-2">
                <FaMapMarkedAlt className="text-2xl " />
                <span className="flex-1 w-fit">Introducing Maps</span>
              </div>
              <FiArrowUpRight id="update-arrow" className="bg-white absolute top-[50%] translate-y-[-50%] text-3xl p-1 shadow-lg text-green-600 rounded-full w-[32px] " />
            </Link>
          </div>
          <p>🎉Now find the nearest hospitals and blood banks in your area!</p>
          {/* {!userInfo && (
            <div className="overflow-hidden flex flex-row items-center rounded-md w-full md:w-[70%] shadow-md">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-[80%] p-4 focus:outline-none font-manrope"
                type="email"
                placeholder="Enter your email"
                value={email}
              />
              <Link
                to={"/user-authentication/signup"}
                className="bg-green-600 p-4 text-white text-center w-[40%]"
              >
                Get Started
              </Link>
            </div>
          )} */}
        </div>
        <div style={{ flexBasis: "50%" }}>
          <div className=" w-full relative">
            <div
              className="w-10 absolute top-0 left-0 bg-yellow-300"
              style={{ aspectRatio: 1, zIndex: -1 }}
            ></div>
            <div
              className="w-20 absolute top-0 right-0 bg-yellow-300"
              style={{ aspectRatio: 1, zIndex: -1 }}
            ></div>
            <div
              className="w-20 absolute bottom-0 left-0 bg-yellow-300"
              style={{ aspectRatio: 1, zIndex: -1 }}
            ></div>
            <img
              draggable={false}
              className="m-auto p-4 md:p-6 z-10 w-full"
              src="https://cdn10.bigcommerce.com/s-p10g1rn/product_images/uploaded_images/medical-assistant.jpg"
            />
          </div>
        </div>
      </section>
      <section className="relative bg-[#111111] text-white py-16 md:p-16 flex flex-col md:flex-row gap-4 md:gap-16 md:rounded-tr-[10em]">
        <div
          className="absolute w-full h-full top-0 -left-[100%] bg-[#111111]"
          style={{ zIndex: -1 }}
        ></div>
        <div
          className="flex flex-col gap-2 items-start justify-center text-left"
          style={{ flexBasis: "50%" }}
        >
          <h2 className="text-5xl font-medium md:leading-snug">
            Healthcare the way you want it. Simple, convinient and reliable.
          </h2>
        </div>
        <div style={{ flexBasis: "50%" }}>
          <div className="flex flex-col gap-8">
            <p className="text-sm text-gray-300">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text.
            </p>
            <div className="flex w-full items-center justify-between">
              <p className="italic text-2xl">
                “Helping those in need is not charity, it’s humanity.” <br></br>
                – Abhijit Naskar
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-[70px] p-2 bg-red-600  right-2 -top-10 md:-top-2 rounded-full flex items-center justify-center absolute text-white"
          style={{ aspectRatio: 1 }}
        >
          <KeyboardVoiceIcon sx={{ size: "36px" }} />
        </div>
        <div
          className="w-[80px] p-2 bg-green-600  left-2 -bottom-12 md:-bottom-10 rounded-full flex items-center justify-center absolute text-white"
          style={{ aspectRatio: 1 }}
        >
          <CallIcon sx={{ size: "42px" }} />
        </div>
      </section>
      <section className="flex flex-col items-center pb-8">
        <h2 className="capitalize text-2xl md:text-5xl text-center">
          Get more important information about health
        </h2>
        <div className="font-manrope flex flex-col md:flex-row flex-wrap gap-2 md:gap-16 md:p-8">
          {blogList?.slice(0, 3)?.map((blog) => (
            <Suspense fallback={<div>Loading...</div>} key={blog._id}>
              <BlogCard key={blog._id} blog={blog} />
            </Suspense>
          ))}
        </div>
        <Link
          className="p-3 rounded bg-green-600 text-white flex items-center"
          to="/blog"
        >
          View All Blogs <ArrowOutwardIcon className="p-1" />
        </Link>
      </section>
    </div>
  );
}

export default Landing;
