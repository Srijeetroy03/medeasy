import React, { memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlogContent } from "../redux/actions/AddBlogActions";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "../styles/blogcard.css";

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const handleBlog = async () => {
    await dispatch(setBlogContent(blog));
    navigate(`/blog/${blog._id}`);
  };
  return (
    <div
      onClick={handleBlog}
      className={`flex flex-col ${
        (pathname === "/" || pathname === "/home") && "flex-1"
      } py-2 gap-4 items-stretch font-poppins border-gray-200 cursor-pointer`}
      key={blog._id}
      style={{ flexBasis: "30%" }}
    >
      <img
        draggable={false}
        src={blog?.image}
        className="w-full md:h-56 bg-black rounded-lg object-cover"
      />
      <div className="flex flex-col justify-evenly gap-2">
        {blog?.author && (
          <p className="text-sm font-bold text-gray-500">
            {new Date(blog?.createdAt).toLocaleString()}
          </p>
        )}
        <h2 className="font-poppins font-bold text-2xl">{blog.title}</h2>
        <p className=" text-sm">{blog.subtitle}</p>
      </div>
    </div>
  );
}

export default memo(BlogCard);
