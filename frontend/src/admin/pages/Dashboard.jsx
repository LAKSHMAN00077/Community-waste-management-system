import { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import SummaryCards from '../components/SummaryCards';
import RecentReportsTable from '../components/RecentReportsTable';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/admin/reports-summary');
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!dashboardData) return <div className="text-center py-8">No data available</div>;

  return (
    <div className="space-y-6">
      <SummaryCards data={dashboardData} />
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
        </div>
        <RecentReportsTable reports={dashboardData.recentReports} />
      </div>
    </div>
  );
};

export default AdminDashboard;