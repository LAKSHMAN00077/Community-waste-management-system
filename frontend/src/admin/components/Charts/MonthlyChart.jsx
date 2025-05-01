import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyChart = ({ data = [] }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthlyCounts = new Array(12).fill(0);

  data.forEach(item => {
    const monthIndex = item._id?.month - 1; 
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyCounts[monthIndex] = item.count;
    }
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Reports per Month',
        data: monthlyCounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full">
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No monthly data available.</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default MonthlyChart;
