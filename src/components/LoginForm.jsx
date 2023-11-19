import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/userAuthActions";
import { toast } from "react-hot-toast";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const [userObj, setUserObj] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Logging in...");
    try {
      await dispatch(loginUser(userObj));
      toast.success("Logged in successfully");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loadToast);
    }
  };

  const handleUsername = (e) => {
    setUserObj((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  };

  const handlePassword = (e) => {
    setUserObj((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  return (
    <div className="flex flex-col w-full p-10 px-6 md:p-10 gap-8">
      <h2 className="font-poppins font-bold text-3xl">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col input-grp relative animate-form ">
          <label className="" htmlFor="email">
            Email or username
          </label>
          <input
            required
            onChange={handleUsername}
            placeholder="Enter your username or email"
            className="focus:outline-0 border-b-2  p-2 py-4 bg-blue-100"
            type="text"
            name="username"
            id="username"
          />
          {/* <p className="absolute bottom-0 left-0 p-2">@</p> */}
        </div>
        <div className="flex flex-col input-grp relative animate-form delay-15">
          <label htmlFor="password">Password</label>
          <input
            required
            onChange={handlePassword}
            className="focus:outline-0 border-b-2 transition-colors pr-10 p-2 bg-blue-100"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
          />
          <button
            className="absolute bottom-0 right-0 p-2"
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        </div>
        <p className="text-red-700">{user?.error}</p>
        <button
          className="btn rounded bg-green-600 hover:bg-green-500 text-white px-4 py-2 transition-all"
          type="submit"
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link
          className="hover:text-green-600 hover:underline transition-all"
          to={"/user-authentication/signup"}
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
