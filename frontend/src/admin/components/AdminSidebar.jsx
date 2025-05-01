import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiFileText, FiUsers, FiBarChart2, 
  FiSettings, FiLogOut, FiX, FiUser 
} from 'react-icons/fi';
import { useState } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from '../../lib/axios';

const AdminSidebar = ({ sidebarOpen, toggleSidebar, handleLogout }) => {
  const location = useLocation();

  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axiosInstance.get('/auth/check');
        setAdmin(res.data);
      } catch (error) {
        console.error("Failed to fetch admin info:", error);
      }
    };

    fetchAdmin();
  }, []);


  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 w-64 bg-blue-700 text-white z-30 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b border-blue-600">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white focus:outline-none"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="p-4">
          
          <div className='m-2'>
            <Link to="/admin/profile" className="block hover:bg-blue-600 rounded-lg transition">
              <div className="flex items-center space-x-3 p-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <FiUser size={20} />
                </div>
                <div>
                  <p className="font-medium">{admin?.user.fullName || 'Admin User'}</p>
                  <p className="text-xs text-blue-200">Administrator</p>
                </div>
              </div>
            </Link>
          </div>

        <nav className="space-y-1">
          <Link
            to="/admin"
            className={`flex items-center w-full p-3 rounded-lg transition ${
              location.pathname === '/admin' ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/reports"
            className={`flex items-center w-full p-3 rounded-lg transition ${
              location.pathname.includes('/admin/reports') ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <FiFileText className="mr-3" />
            Reports
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center w-full p-3 rounded-lg transition ${
              location.pathname.includes('/admin/users') ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <FiUsers className="mr-3" />
            Users
          </Link>
          <Link
            to="/admin/analytics"
            className={`flex items-center w-full p-3 rounded-lg transition ${
              location.pathname.includes('/admin/analytics') ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <FiBarChart2 className="mr-3" />
            Analytics
          </Link>
          <Link
            to="/admin/profile"
            className={`flex items-center w-full p-3 rounded-lg transition ${
              location.pathname.includes('/admin/profile') ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <FiSettings className="mr-3" />
            Profile
          </Link>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 text-red-200 hover:text-white rounded-lg transition"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;