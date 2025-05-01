const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    };
  
    const statusText = {
      pending: 'Pending',
      'in-progress': 'In Progress',
      resolved: 'Resolved'
    };
  
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };
  
  export default StatusBadge;