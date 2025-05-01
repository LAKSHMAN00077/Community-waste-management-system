import { useState, useEffect } from 'react';
import axiosInstance from '../../lib/axios'; // 👈 same here

const useUsers = (initialPage = 1, initialLimit = 10, initialRole = '') => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0
  });
  const [roleFilter, setRoleFilter] = useState(initialRole);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/users', {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          role: roleFilter || undefined,
        }
      });
      setUsers(response.data.users);
      setPagination(prev => ({
        ...prev,
        total: response.data.totalUsers,
        totalPages: response.data.totalPages
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const changeLimit = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const changeRoleFilter = (newRole) => {
    setRoleFilter(newRole);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.limit, roleFilter]);

  return { 
    users, 
    loading, 
    error, 
    pagination, 
    roleFilter,
    changePage, 
    changeLimit,
    changeRoleFilter,
    refresh: fetchUsers 
  };
};

export default useUsers;
