import {Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './DashboardHome';
import ReportsPage from './ReportsPage';
import AnalyticsPage from './AnalyticsPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';

export const userDashboardRoute= () => {
  return (

        <Route path="/user-dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

  );
}