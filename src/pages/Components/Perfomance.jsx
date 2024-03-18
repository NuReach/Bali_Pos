import React from 'react';
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
import { Chart, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Perfomance() {
  const days = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
];
const revenue = [3, 10, 20, 30, 40, 69, 33, 40, 20, 50, 80, 69, 30, 80, 60, 50, 40, 39, 33, 15, 80, 50, 20, 21, 30, 40, 30, 50, 120, 33];

  const data = {
    labels: days,
    datasets: [
      {
        label: 'This Month',
        data: revenue,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.6 // This adds some "curve" to the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Sales Data',
      // },
    },
  };
  return (
    <div className='w-full p-6 shadow-lg rounded-lg border h-full'>
      <p className='font-bold text-lg w-fit'>Sale In This Month </p>
      <div className='h-full'>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
