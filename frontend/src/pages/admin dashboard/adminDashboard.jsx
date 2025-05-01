import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/admin/reports-summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching admin summary:", err);
        alert("Failed to load dashboard.");
      }
    };

    fetchSummary();
  }, []);

  const formatMonth = (entry) =>
    `${entry._id.month.toString().padStart(2, "0")}/${entry._id.year}`;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {!summary ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Total Reports</h2>
              <p className="text-2xl">{summary.totalReports}</p>
            </div>
            {summary.reportsByStatus.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold capitalize">{item._id}</h2>
                <p className="text-2xl">{item.count}</p>
              </div>
            ))}
          </div>

          {/* Monthly Reports Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Monthly Report Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={summary.monthlyReports.map((entry) => ({
                name: formatMonth(entry),
                count: entry.count,
              }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Reports Table */}
          <div className="bg-white p-4 rounded shadow overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Recent Reports</h2>
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="px-2 py-1">Location</th>
                  <th className="px-2 py-1">Category</th>
                  <th className="px-2 py-1">Status</th>
                  <th className="px-2 py-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentReports.map((rpt) => (
                  <tr key={rpt._id}>
                    <td className="px-2 py-1">{rpt.location}</td>
                    <td className="px-2 py-1 capitalize">{rpt.category}</td>
                    <td className="px-2 py-1">{rpt.status}</td>
                    <td className="px-2 py-1">{new Date(rpt.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/admin/reports")}
            >
              Manage Reports
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => navigate("/admin/users")}
            >
              View Users
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
