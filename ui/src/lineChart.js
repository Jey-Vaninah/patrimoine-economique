// src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date), // X-axis labels
    datasets: [
      {
        label: 'Valeur du Patrimoine',
        data: data.map(item => item.value), // Y-axis data
        fill: false,
        borderColor: '#28a745', // Green color for the line
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Valeur: ${tooltipItem.raw} €`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Valeur (€)'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
