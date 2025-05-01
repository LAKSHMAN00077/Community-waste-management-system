import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/components/AdminLayout";
import AdminDashboard from "../admin/pages/Dashboard";
import ReportsPage from "../admin/pages/Reports";
import UsersPage from "../admin/pages/Users";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
