import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TaskerLayout from '../components/Tasker/TaskerLayout'
import TaskerDashboard from '../components/Tasker/TaskerDashboard'

const TaskerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskerLayout />}>
        {/* Dashboard is the default view when on /tasker */}
        <Route index element={<TaskerDashboard/>} /> 
        
        {/* Other pages will load here later */}
        <Route path="tasks" element={<div className="p-8 text-xl">Tasks Page Coming Soon...</div>} />
        <Route path="schedule" element={<div className="p-8 text-xl">Earnings Page Coming Soon...</div>} />
        <Route path="requests" element={<div className="p-8 text-xl">Earnings Page Coming Soon...</div>} />
        <Route path="messages" element={<div className="p-8 text-xl">Earnings Page Coming Soon...</div>} />
        <Route path="earnings" element={<div className="p-8 text-xl">Earnings Page Coming Soon...</div>} />
        <Route path="settings" element={<div className="p-8 text-xl">Earnings Page Coming Soon...</div>} />

      </Route>
      <Route path="*" element={<div>Tasker 404 Not Found</div>} />
    </Routes>
  )
}

export default TaskerRoutes