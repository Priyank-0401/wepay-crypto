import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ETHDistributionChart = ({ categories }) => {
  const chartRef = useRef(null);

  // Chart data configuration
  const data = {
    labels: categories.map(item => item.category),
    datasets: [
      {
        data: categories.map(item => item.amount),
        backgroundColor: categories.map(item => item.color),
        borderColor: '#16213e',
        borderWidth: 2,
        hoverBorderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false, // Legend is handled separately in the component
      },
      tooltip: {
        backgroundColor: 'rgba(22, 33, 62, 0.9)',
        titleColor: '#f0f0f0',
        bodyColor: '#f0f0f0',
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} ETH`;
          }
        },
        borderColor: 'rgba(42, 42, 64, 0.5)',
        borderWidth: 1,
      }
    },
  };

  // Update chart when dark mode or categories change
  useEffect(() => {
    if (chartRef.current) {
      // Update chart data
      chartRef.current.data.labels = categories.map(item => item.category);
      chartRef.current.data.datasets[0].data = categories.map(item => item.amount);
      chartRef.current.data.datasets[0].backgroundColor = categories.map(item => item.color);
      
      // Update chart theme
      chartRef.current.data.datasets[0].borderColor = '#16213e';
      chartRef.current.options.plugins.tooltip.backgroundColor = 'rgba(22, 33, 62, 0.9)';
      chartRef.current.options.plugins.tooltip.titleColor = '#f0f0f0';
      chartRef.current.options.plugins.tooltip.bodyColor = '#f0f0f0';
      chartRef.current.options.plugins.tooltip.borderColor = 'rgba(42, 42, 64, 0.5)';
      
      // Apply changes
      chartRef.current.update();
    }
  }, [categories]);

  return (
    <div className="eth-distribution-chart">
      <div className="chart-container">
        <Doughnut data={data} options={options} ref={chartRef} />
      </div>
      {/* We'll still show the category list outside of the chart */}
    </div>
  );
};

export default ETHDistributionChart; 