import React from "react";
import BlogCard from "./HomeBlogCard";

function BlogList({ blogList }) {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap justify-between font-poppins gap-4 items-stretch pb-8"
      style={{ flexBasis: "33%" }}
    >
      {blogList?.length === 0 && <p>No blogs posted yet!</p>}
      {blogList && blogList?.map((blog) => <BlogCard blog={blog} />)}
    </div>
  );
}

export default BlogList;
