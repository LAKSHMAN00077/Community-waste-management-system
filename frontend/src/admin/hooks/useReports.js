import { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios';
const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      const response = await axiosInstance.get('/admin/reports');
      setReports(response.data.data);
      // console.log("reports : ",reports)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      await axiosInstance.put(`/admin/reports/${reportId}`, { status: newStatus });
      setReports(reports.map(report => 
        report._id === reportId ? { ...report, status: newStatus } : report
      ));
      return true;
    } catch (err) {
      console.error('Failed to update status:', err);
      return false;
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await axiosInstance.delete(`/admin/reports/${reportId}`);
      setReports(reports.filter(report => report._id !== reportId));
      return true;
    } catch (err) {
      console.error('Failed to delete report:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return { reports, loading, error, updateReportStatus, deleteReport, refresh: fetchReports };
};

export default useReports;
