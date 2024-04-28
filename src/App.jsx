import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Authentication from "./pages/Authentication/Authentication";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfileForm from "./components/ProfileForm";
import AppHome from "./pages/Home";
import Home from "./pages/InApp/Home";
import { setUser } from "./redux/actions/userAuthActions";
import { useDispatch } from "react-redux";

import { NavProvider } from "./context/NavContext";

import AddBlog from "./pages/InApp/AddBlog";
import Blog from "./pages/InApp/Blog";
import Profile from "./pages/InApp/Profile";
import EditBlog from "./pages/InApp/EditBlog";
import Landing from "./pages/InApp/Landing";
import DoctorList from "./pages/InApp/DoctorList";
import Doctor from "./pages/InApp/Doctor";
import DoctorProfile from "./pages/InApp/DoctorProfile";
import Appointment from "./pages/InApp/Appointment";
import Meet from "./pages/Meet/Meet";
import { SocketProvider } from "./context/SocketContext";
import Hospitals from "./pages/InApp/Hospitals";
import Main from "./components/Body/Main";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);

  return (
    <SocketProvider>
      <NavProvider>
        <div className="w-full">
          <Router>
            <Routes>
              <Route path="/" element={<AppHome />}>
                <Route path="home" element={<Landing />} />
                <Route path="blog" element={<Home />} />
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
              <Route path="/main" element={<Main />} />
              <Route path="/map" element={<Hospitals />} />

              <Route path="/meet/:roomId" element={<Meet />} />

              {/* <Route path='/' element={<ProtectedRoute Component={AppHome}/>}>
          <Route path='home' element={<Landing/>}/>
          <Route path='blogs' element={<Home/>}/>
          
          <Route path='blog/:id' element={<Blog/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Route> */}
              {/* <Route path='/user-authentication' element={<Authentication/>}>
          <Route path='login' element={<LoginForm/>}/>
          <Route path='signup' element={<SignupForm/>}/>
          <Route path='profile' element={<ProfileForm/>}/>
        </Route> */}
            </Routes>
          </Router>
        </div>
      </NavProvider>
    </SocketProvider>
  );
}

export default App;
