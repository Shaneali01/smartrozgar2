import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes'
import TaskerRoutes from './Routes/TaskerRoutes'
import NotFound from './Pages/NotFound'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS
import { useAuth } from './context/AuthContext'
import UserRoutes from './routes/UserRoutes'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar'

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
   <Toaster 
  position="top-right" // Popular choice for dashboards
  toastOptions={{
    // Global Base Style
    duration: 4000,
    style: {
      background: '#0a0a0a',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '16px',
      borderRadius: '15px',
      fontSize: '11px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    // SUCCESS (Emerald)
    success: {
      style: { borderTop: '4px solid #10b981' },
      iconTheme: { primary: '#10b981', secondary: '#000' },
    },
    // ERROR (Red)
    error: {
      style: { borderTop: '4px solid #ef4444' },
      iconTheme: { primary: '#ef4444', secondary: '#000' },
    },
  }}
/>
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
