import { Fragment, useState } from 'react';
import { FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const ReportsTable = ({ reports, onStatusUpdate, onDelete }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  const sortedReports = [...reports].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatusChange = async (reportId, e) => {
    console.log('Attempting to update status for:', reportId, 'to:', e.target.value);
    try {
        await onStatusUpdate(reportId, e.target.value);
        console.log('Status update successful');
    } catch (error) {
        console.error('Status update failed:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('user.fullName')}
            >
              <div className="flex items-center">
                Reported By
                {sortConfig.key === 'user.fullName' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                )}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('category')}
            >
              <div className="flex items-center">
                Category
                {sortConfig.key === 'category' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                )}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('status')}
            >
              <div className="flex items-center">
                Status
                {sortConfig.key === 'status' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                )}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('createdAt')}
            >
              <div className="flex items-center">
                Date
                {sortConfig.key === 'createdAt' && (
                  sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedReports.map((report) => (
            <Fragment key={report._id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {report.user?.fullName || 'Unknown User'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 capitalize">{report.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report._id, e)}
                    className={`text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => toggleExpand(report._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {expandedRow === report._id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    <button
                      onClick={() => onDelete(report._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
              {expandedRow === report._id && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>


                        {report.imageUrl && (
                          <div className="mt-2">
                            <h4 className="font-medium mb-2">Image</h4>
                            <img
                              src={report.imageUrl}
                              alt="Reported Waste"
                              className="w-full max-w-md rounded-md border"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Details</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>Location: {report.location}</li>
                          <li>Reported by: {report.user?.fullName || 'Unknown'}</li>
                          <li>
                            Last updated: {new Date(report.updatedAt).toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              )}

            </Fragment>
          ))}
        </tbody>
      </table>
      {reports.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No reports found
        </div>
      )}
    </div>
  );
};

export default ReportsTable;