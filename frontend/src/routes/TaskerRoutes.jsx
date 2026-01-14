import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TaskerLayout from '../components/Tasker/TaskerLayout'
import TaskerDashboard from '../components/Tasker/TaskerDashboard'
import TaskerTasks from '../pages/tasker/TaskerTasks'
import TaskerSchedule from '../pages/tasker/TaskerSchedule'
import TaskerRequests from '../pages/tasker/TaskerRequests'
import TaskerMessages from '../pages/tasker/TaskerMessages'
import TaskerEarnings from '../pages/tasker/TaskerEarnings'
import TaskerSettings from '../pages/tasker/TaskerSettings'

const TaskerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskerLayout />}>
        {/* Dashboard is the default view when on /tasker */}
        <Route index element={<TaskerDashboard/>} /> 
        
        {/* Other pages will load here later */}
        <Route path="tasks" element={<TaskerTasks/>} />
        <Route path="schedule" element={<TaskerSchedule/>} />
        <Route path="requests" element={<TaskerRequests/>} />
        <Route path="messages" element={<TaskerMessages/>} />
        <Route path="earnings" element={<TaskerEarnings/>} />
        <Route path="settings" element={<TaskerSettings/>} />

      </Route>
      <Route path="*" element={<div>Tasker 404 Not Found</div>} />
    </Routes>
  )
}

export default TaskerRoutes