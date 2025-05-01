import { FiAlertTriangle, FiClock, FiCheckCircle, FiFileText } from 'react-icons/fi';

const SummaryCards = ({ data }) => {
  // Provide default values if data is undefined
  const safeData = {
    totalReports: data?.totalReports || 0,
    reportsByStatus: data?.reportsByStatus || [],
    reportsByCategory: data?.reportsByCategory || [],
    monthlyReports: data?.monthlyReports || [],
    recentReports: data?.recentReports || []
  };
  

  // Helper function to safely get status count
  const getStatusCount = (status) => {
    const statusItem = (safeData.reportsByStatus || []).find(item => item?._id === status);
    return statusItem ? statusItem.count : 0;
  };  

  const cards = [
    {
      title: 'Total Reports',
      value: safeData.totalReports,
      icon: <FiFileText size={20} />,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Pending',
      value: getStatusCount('pending'),
      icon: <FiAlertTriangle size={20} />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'In Progress',
      value: getStatusCount('in-progress'),
      icon: <FiClock size={20} />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Resolved',
      value: getStatusCount('resolved'),
      icon: <FiCheckCircle size={20} />,
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${card.color} mr-4`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;