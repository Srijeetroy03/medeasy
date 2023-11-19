import React from "react";
import { Link } from "react-router-dom";
function Brand({ size, color }) {
  return (
    <div
      title="Home"
      className={`font-extrabold capitalize font-poppins ${color} text-${size}xl`}
    >
      <Link to={"/home"}>MedEasy</Link>
    </div>
  );
}

export default Brand;
