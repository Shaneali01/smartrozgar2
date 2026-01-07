import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/tasker/Home'

const TaskerRoutes = () => {
  return (
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<div>Tasker Profile</div>} />
        <Route path="*" element={<div>User 404 Not Found</div>} />
    </Routes>
  )
}

export default TaskerRoutes