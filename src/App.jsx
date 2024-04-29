import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/ProfileForm";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupForm from "./components/SignupForm";
import Authentication from "./pages/Authentication/Authentication";
import AppHome from "./pages/Home";
import Home from "./pages/InApp/Home";
import { setUser } from "./redux/actions/userAuthActions";

import { NavProvider } from "./context/NavContext";

import Main from "./components/Body/Main";
import ChatBot from "./components/ChatPage/ChatBot";
import AddBlog from "./pages/InApp/AddBlog";
import Appointment from "./pages/InApp/Appointment";
import Blog from "./pages/InApp/Blog";
import Doctor from "./pages/InApp/Doctor";
import DoctorList from "./pages/InApp/DoctorList";
import DoctorProfile from "./pages/InApp/DoctorProfile";
import EditBlog from "./pages/InApp/EditBlog";
import Hospitals from "./pages/InApp/Hospitals";
import Landing from "./pages/InApp/Landing";
import Profile from "./pages/InApp/Profile";
import Meet from "./pages/Meet/Meet";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);

  return (
    <NavProvider>
      <div className="w-full">
        <Router>
          <Routes>
            <Route path="/" element={<AppHome />}>
              <Route path="home" element={<Landing />} />
              <Route path="blog" element={<Home />} />
              <Route path="main" element={<Main />}></Route>
              <Route path="melly" element={<ChatBot />} />
              <Route path="doctor" element={<Doctor />}>
                <Route path=":speciality" element={<DoctorList />} />
              </Route>
              <Route path="appointments" element={<Appointment />} />
              <Route path="doctor/profile/:id" element={<DoctorProfile />} />
              <Route path="blog/:id" element={<Blog />} />
              <Route
                path="add"
                element={<ProtectedRoute Component={AddBlog} />}
              />
              <Route
                path="edit"
                element={<ProtectedRoute Component={EditBlog} />}
              />
              <Route
                path="edit/preview"
                element={<ProtectedRoute Component={Blog} />}
              />
              <Route
                path="preview"
                element={<ProtectedRoute Component={Blog} />}
              />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="user-authentication" element={<Authentication />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignupForm />} />
                <Route path="profile" element={<ProfileForm />} />
              </Route>
            </Route>

            <Route path="/map" element={<Hospitals />} />

            <Route path="/meet/:roomId" element={<Meet />} />
          </Routes>
        </Router>
      </div>
    </NavProvider>
  );
}

export default App;
