import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/admin/HomePage'

const AdminRoutes = () => {
  return (
     <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<div>Admin Profile</div>} />
        <Route path="*" element={<div>User 404 Not Found</div>} />
    </Routes>
  )
}

export default AdminRoutes