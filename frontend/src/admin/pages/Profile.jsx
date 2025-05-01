import { useState, useEffect } from 'react';
import { axiosInstance } from '../../lib/axios';
import { FiEdit, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axiosInstance.get('/users/profile');
        setAdmin(response.data);
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading) return <div className="text-center py-8">Loading profile...</div>;
  if (!admin) return <div className="text-center py-8 text-red-500">Failed to load profile</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Profile</h1>
            <Link 
              to="/admin/profile/edit"
              className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FiUser size={48} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">{admin?.data.name}</h2>
              <p className="text-blue-600">Administrator</p>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-2">
                    <FiMail className="mr-2" />
                    <span>Email</span>
                  </div>
                  <p className="font-medium">{admin?.data.email}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-2">
                    <FiPhone className="mr-2" />
                    <span>Phone</span>
                  </div>
                  <p className="font-medium">{admin?.data.contact || 'Not provided'}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-2">
                    <FiCalendar className="mr-2" />
                    <span>Joined</span>
                  </div>
                  <p className="font-medium">
                    {new Date(admin?.data.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;