import React, { useRef } from "react";
import Brand from "./Brand";
import NavBtn from "./NavBtn";
import NavMenu from "./NavMenu";
import Progress from "../Progress";
import NavButton from "./NavButton";
import SearchAppBar from "../Search";

import { useNav } from "../../context/NavContext";

function Navbar() {
  const nav = useRef();
  const { toggleSearchBar } = useNav();
  return (
    <>
      <Progress />
      <div
        className="flex flex-col font-poppins md:flex-row items-center justify-between  container transition-colors px-4 md:px-0"
        style={{ flexBasis: "50%" }}
      >
        <div className="flex flex-row items-center justify-between container">
          <Brand size={2} color={"text-green-600"} />
          <NavButton />
        </div>
        {/* <div className='flex w-full'> */}
        <NavMenu />
        {/* </div> */}
      </div>
      <SearchAppBar />
    </>
  );
}

export default Navbar;
