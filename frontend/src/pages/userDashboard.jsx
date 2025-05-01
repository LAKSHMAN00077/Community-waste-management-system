import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import {
  FiMenu,
  FiX,
  FiUser,
  FiFileText,
  FiPlusCircle,
  FiBarChart2,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiLogOut,
  FiHome,
  FiSettings
} from "react-icons/fi";
import StatusChart from "../components/StatusChart";
import Swal from 'sweetalert2';


const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("reports");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async() => {
      try {
        const response = await axiosInstance.get("/reports");
        setReports(response.data.reports);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  const stats = {
    pending: Array.isArray(reports) ? reports.filter(r => r.status === "pending").length : 0,
    inProgress: Array.isArray(reports) ? reports.filter(r => r.status === "in-progress").length : 0,
    resolved: Array.isArray(reports) ? reports.filter(r => r.status === "resolved").length : 0
  };
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }


  const handleUpdatePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Password',
      html:
        '<input id="current-password" type="password" class="swal2-input" placeholder="Current Password">' +
        '<input id="new-password" type="password" class="swal2-input" placeholder="New Password">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
  
        if (!currentPassword || !newPassword) {
          Swal.showValidationMessage('Both fields are required!');
          return;
        }
  
        if (newPassword.length < 6) {
          Swal.showValidationMessage('New password must be at least 6 characters!');
          return;
        }
  
        return { currentPassword, newPassword };
      }
    });
  
    if (!formValues) return;
  
    try {
      const res = await axiosInstance.put('/users/update-password', {
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword,
      });
  
      Swal.fire('Success', res.data.message || 'Password updated successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Something went wrong', 'error');
    }
  };
  

    const handleDeleteAccount = async () => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will permanently delete your account!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#e11d48',
      });

      if (!result.isConfirmed) return;

      try {
        const res = await axiosInstance.delete('/users/delete-account');

        Swal.fire('Deleted!', res.data.message || 'Your account has been deleted.', 'success');


        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } catch (err) {
        Swal.fire('Error', err.response?.data?.error || 'Something went wrong', 'error');
      }
    };


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-green-700 text-white z-30 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-600">
          <h2 className="text-xl font-bold">Waste Management</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white focus:outline-none"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 p-3 bg-green-600 rounded-lg mb-6">
            <div className="bg-green-500 p-2 rounded-full">
              <FiUser size={20} />
            </div>
            <div>
              <p className="font-medium">{currentUser.fullName}</p>
              <p className="text-xs text-green-200">{currentUser.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === "dashboard" ? "bg-green-600" : "hover:bg-green-600"}`}
            >
              <FiHome className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === "reports" ? "bg-green-600" : "hover:bg-green-600"}`}
            >
              <FiFileText className="mr-3" />
              My Reports
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === "analytics" ? "bg-green-600" : "hover:bg-green-600"}`}
            >
              <FiBarChart2 className="mr-3" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === "profile" ? "bg-green-600" : "hover:bg-green-600"}`}
            >
              <FiUser className="mr-3" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === "settings" ? "bg-green-600" : "hover:bg-green-600"}`}
            >
              <FiSettings className="mr-3" />
              Settings
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-600">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-red-200 hover:text-white rounded-lg transition"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "reports" && "My Reports"}
              {activeTab === "analytics" && "Analytics"}
              {activeTab === "profile" && "Profile"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <div className="w-8"></div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome back, {currentUser.fullName}!
                </h2>
                <p className="text-gray-600">
                  Here's what's happening with your waste reports.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                      <FiAlertCircle size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending</p>
                      <p className="text-2xl font-bold">{stats.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <FiClock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold">{stats.inProgress}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <FiCheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Resolved</p>
                      <p className="text-2xl font-bold">{stats.resolved}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Reports</h3>
                    <Link
                      to="/create-report"
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <FiPlusCircle className="mr-2" />
                      New Report
                    </Link>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {reports.slice(-3).reverse().map((report) => (
                    <div key={report.id || report._id} className="p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <div className="text-sm text-gray-500">
                          <span>{report.location}</span>
                            <span>   •   </span>
                            <span>   {report.category}   </span>
                            <span>   •   </span>
                            <span>
                                {new Date(report.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}  
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            report.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : report.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">All Reports</h3>
                  <Link
                    to="/create-report"
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <FiPlusCircle className="mr-2" />
                    New Report
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {reports.slice().reverse().map((report) => (
                  <div key={report.id || report._id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <div className="text-sm text-gray-500">
                          <div className="flex flex-wrap gap-2 text-md text-gray-600">
                            <span>{report.location}</span>
                            <span>•</span>
                            <span>{report.category}</span>
                            <span>•</span>
                            <span>
                              {new Date(report.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          report.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : report.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Reports Analytics</h2>
              
              <div className="flex justify-center">
                <div className="w-full max-w-md h-64">
                  <StatusChart 
                    pending={stats.pending} 
                    inProgress={stats.inProgress} 
                    resolved={stats.resolved} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Status Summary Card */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Reports by Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span>Pending</span>
                      </div>
                      <span className="font-medium">{stats.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>In Progress</span>
                      </div>
                      <span className="font-medium">{stats.inProgress}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Resolved</span>
                      </div>
                      <span className="font-medium">{stats.resolved}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Card */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-3">
                    {reports.slice(-3).reverse().map((report) => (
                      <div key={report.id || report._id} className="text-sm">
                        <p className="font-medium">{report.title}</p>
                        <p className="text-gray-500">
                          {new Date(report.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">User Profile</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <FiUser size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{currentUser.fullName}</h3>
                    <p className="text-gray-500">{currentUser.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="p-2 bg-gray-50 rounded">{currentUser.fullName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="p-2 bg-gray-50 rounded">{currentUser.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="p-2 bg-gray-50 rounded">{currentUser.phoneNumber}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                    <div className="p-2 bg-gray-50 rounded">{new Date(currentUser?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => navigate('/user-dashboard/edit-profile')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
              <div className="space-y-6">


                <div>
                  <h3 className="font-medium mb-3">Change Password</h3>
                  <button
                    onClick={handleUpdatePassword}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Update Password
                  </button>
                </div>


                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleDeleteAccount} 
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default DashboardPage;