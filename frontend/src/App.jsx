import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import ProtectedRoute from "./components/protectedRoute";
import DashboardPage from "./pages/userDashboard";
import CreateReport from "./pages/createReport";

import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import ReportsPage from "./admin/pages/Reports";
import UsersPage from "./admin/pages/Users";
import AnalyticsPage from "./admin/pages/Analytics";
import Profile from "./admin/pages/Profile";
import EditAdminProfile from "./admin/pages/EditAdminProfile"
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import EditProfile from "./pages/EditProfile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/user-dashboard" element={
        <ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>
      } />
      <Route path="/create-report" element={
        <ProtectedRoute>
          <CreateReport />
        </ProtectedRoute>
      } />

      <Route path="/user-dashboard/edit-profile" element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditAdminProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
