import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import TaskerRoutes from './Routes/TaskerRoutes'
import NotFound from './Pages/NotFound'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS
import { useAuth } from './context/AuthContext'

function App() {
  const {userRole}=useAuth();
  useEffect(() => {
    AOS.init({
      duration: 900, // Animation duration in ms
      once: false,     // Whether animation should happen only once
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {userRole === "hirer" && <Route path="/*" element={<UserRoutes />} />}
          {userRole === "admin" && <Route path="/*" element={<AdminRoutes />} />}
          {userRole === "tasker" && <Route path="/*" element={<TaskerRoutes />} />}
        </Routes>
  
    </>
  )
}

export default App
