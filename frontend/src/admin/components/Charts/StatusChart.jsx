import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ data = [] }) => {
  const colorMap = {
    pending: 'rgba(255, 206, 86, 0.7)',      // Yellow
    'in-progress': 'rgba(54, 162, 235, 0.7)', // Blue
    resolved: 'rgba(75, 192, 192, 0.7)',      // Green
  };

  const borderColorMap = {
    pending: 'rgba(255, 206, 86, 1)',
    'in-progress': 'rgba(54, 162, 235, 1)',
    resolved: 'rgba(75, 192, 192, 1)',
  };

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: data.map(item => colorMap[item._id] || 'rgba(201, 203, 207, 0.7)'), // default gray
        borderColor: data.map(item => borderColorMap[item._id] || 'rgba(201, 203, 207, 1)'),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return data.length === 0 ? (
    <p className="text-gray-500 text-center">No status data available.</p>
  ) : (
    <Pie data={chartData} options={options} />
  );
};

export default StatusChart;
