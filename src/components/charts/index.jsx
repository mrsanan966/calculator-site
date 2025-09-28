import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Default options for all charts
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
};

export const LineChart = ({ data, options = {} }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Principal',
        data: data.map(item => item.principal),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Interest',
        data: data.map(item => item.interest),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        fill: true,
        tension: 0.4
      },
    ],
  };

  return (
    <div style={{ height: '300px' }}>
      <Line 
        data={chartData} 
        options={{ ...defaultOptions, ...options }}
      />
    </div>
  );
};

export const BarChart = ({ data, options = {} }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Amount',
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(16, 185, 129, 0.5)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 1
      },
    ],
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar 
        data={chartData} 
        options={{ ...defaultOptions, ...options }}
      />
    </div>
  );
};

export const PieChart = ({ data, options = {} }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(16, 185, 129, 0.5)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '300px' }}>
      <Pie 
        data={chartData} 
        options={{ ...defaultOptions, ...options }}
      />
    </div>
  );
}; 