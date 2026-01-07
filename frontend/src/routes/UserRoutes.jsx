import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/user/Home'
import ContactForm from '../pages/user/Contact'
import AboutUs from '../pages/user/AboutUs'
import Profile from "../pages/user/Profile"
import ProfileGeneral from '../components/profile/ProfileGeneral'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileGeneral />} />
            <Route path="tasks" element={<div>My Booked Tasks</div>} />
            <Route path="wallet" element={<div>Wallet & Payments</div>} />
            <Route path="settings" element={<div>Account Settings</div>} />
        </Route>

        <Route path="/profile" element={<div>User Profile</div>} />
        <Route path="*" element={<div>User 404 Not Found</div>} />
    </Routes>
  )
}

export default UserRoutes