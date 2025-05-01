import { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import StatusChart from '../components/Charts/StatusChart';
import CategoryChart from '../components/Charts/CategoryChart';
import MonthlyChart from '../components/Charts/MonthlyChart';
import LoadingSpinner from '../../components/loadingSpinner';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axiosInstance.get('/admin/reports-summary');
        setAnalyticsData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Reports by Status</h2>
          <div className="h-64">
            <StatusChart data={analyticsData.reportsByStatus} />
          </div>
        </div>

        {/* Category Chart Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Reports by Category</h2>
          <div className="h-64">
            <CategoryChart data={analyticsData.reportsByCategory} />
          </div>
        </div>

        {/* Monthly Chart Card (Full Width) */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Monthly Reports</h2>
          <div className="h-96">
            <MonthlyChart data={analyticsData.monthlyReports} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;