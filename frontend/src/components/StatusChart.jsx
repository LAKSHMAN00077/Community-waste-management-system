import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ pending, inProgress, resolved }) => {
  const data = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        data: [pending, inProgress, resolved],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',  // Yellow for pending
          'rgba(54, 162, 235, 0.7)',   // Blue for in-progress
          'rgba(75, 192, 192, 0.7)'    // Green for resolved
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
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
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
  };

  return <Pie data={data} options={options} />;
};

export default StatusChart;