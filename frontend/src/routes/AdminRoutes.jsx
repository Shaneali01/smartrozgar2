import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminPage";
import AdminUserManagement from "../pages/admin/UserManagement";
import AdminFinancials from "../pages/admin/AdminFinancials";
import AdminTaskerReview from "../pages/admin/TaskerReview";
import AdminSystemLogs from "../pages/admin/AdminSystemLogs";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminSupportTickets from "../pages/admin/AdminSupportTicket";
import AdminDisputeCenter from "../pages/admin/AdminDisputeCenter";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/user-management" element={<AdminUserManagement />} />
        <Route path="/financials" element={<AdminFinancials />} />
        <Route path="/tasker-review" element={<AdminTaskerReview />} />
        <Route path="/reports" element={<AdminDashboard />} />
        <Route path="/system-logs" element={<AdminSystemLogs />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/support-tickets" element={<AdminSupportTickets />} />
        <Route path="/dispute-center" element={<AdminDisputeCenter />} />


        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
