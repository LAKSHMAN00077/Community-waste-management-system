import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import ReportsTable from '../components/ReportsTable';
import { axiosInstance } from '../../lib/axios';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get('/admin/reports');
        console.log("reports 2 : ",reports);
        setReports(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      const response = await axiosInstance.put(`/admin/reports/${reportId}`, {
        status: newStatus,
      });
  
      const updatedReport = response.data.data;
  
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? updatedReport : report
        )
      );
  
      return updatedReport;
    } catch (error) {
      console.error("Status update failed:", error);
      throw error;
    }
  };
  


  const handleDeleteReport = async (reportId) => {
    try {
      await axiosInstance.delete(`/admin/reports/${reportId}`);
      setReports(reports.filter(report => report._id !== reportId));
    } catch (err) {
      console.error('Failed to delete report:', err);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      (report.user?.fullName && report.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="text-center py-8">Loading reports...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-lg font-semibold">Manage Reports</h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <ReportsTable
        reports={filteredReports}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDeleteReport}
      />
    </div>
  );
};

export default ReportsPage;
