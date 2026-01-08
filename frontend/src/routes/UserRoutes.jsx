import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import ContactForm from "../pages/user/Contact";
import AboutUs from "../pages/user/AboutUs";
import Profile from "../pages/user/Profile";
import ProfileGeneral from "../components/profile/ProfileGeneral";
import MyBookedTasks from "../components/profile/BookedTasks";
import { useAuth } from "../context/AuthContext";
import MyWallet from "../components/profile/MyWallet";
import AccountSettings from "../components/profile/AccountSettings";
import ServiceDetail from "../pages/user/ServiceDetail";
import AllServices from "../pages/user/AllServices";

const UserRoutes = () => {
  const userRole = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route
        path="/profile"
        element={userRole ? <Profile /> : <Navigate to="/login" replace />}
      >
        <Route index element={<ProfileGeneral />} />
        <Route path="tasks" element={<MyBookedTasks />} />
        <Route path="wallet" element={<MyWallet />} />
        <Route path="settings" element={<AccountSettings />} />
      </Route>
      <Route
        path="/services/:serviceName"
        element={
          userRole ? <ServiceDetail /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/services"
        element={ <AllServices />}
      />
      <Route path="/profile" element={<div>User Profile</div>} />
      <Route path="*" element={<div>User 404 Not Found</div>} />
    </Routes>
  );
};

export default UserRoutes;
