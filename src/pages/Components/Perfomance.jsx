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
import { getMonthlyReport } from '../../api';
import { useQuery } from '@tanstack/react-query';

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

  const { isLoading: monthlyReportLoading, isError: monthlyReportFetching, data: monthlyReport } = useQuery(
        { queryKey: ['monthlyReport'], 
        queryFn: getMonthlyReport , 
        staleTime : Infinity,
        }
    ) ;

  console.log(monthlyReport);
  const days=[];
  const filterdays = monthlyReport?.map((item)=>{
    days.push(new Date(item.start).getDay());
  })
  const revenue = [];
  const filterRevenue = monthlyReport?.map((item)=>{
    revenue.push(item.totalPrice);
  });
  

  const data = {
    labels: days,
    datasets: [
      {
        label: 'This Month Sale',
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
    <div className='w-full p-6 shadow-lg rounded-lg border h-96'>
      <p className='font-bold text-lg w-fit'>Sale In This Month </p>
      <div className='h-full'>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
