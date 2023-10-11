import React, { useEffect, useState } from "react";
import { Chart as chartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

function HostChart() {

const [income,setIncome] = useState([])
const [line,setLine] = useState([])

  useEffect(()=>{
    axios.get("/host/dashboard/bargraph").then(({ data }) => {
     setIncome([...data])
    });
    axios.get("/host/dashboard/linegraph").then(({ data }) => {
     setLine([...data])
    });
  },[])
  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[monthNumber - 1];
  };

  const chartData = {
    labels: income.map((item) => getMonthName(item.month)),
    datasets: [
      {
        label: "Revenue",
        data: income.map((item) => item.price_monthly),
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineData = {
    labels: line.map((item) => getMonthName(item.month)),
    datasets: [
      {
        label: "Bookings",
        data: line.map((item) => item.count),
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] md:grid-cols-1 gap-4 mx-4">
      <div className="bg-white pl-5 pb-10 rounded-lg shadow-md max-h-96 ">
        <h2 className="fond-bold text-xl mb-2 mt-1">Monthly Income</h2>
        <Bar data={chartData} options={options} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="fond-bold text-xl mb-2">Monthly Bookings</h2>
        <div className="pt-10">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default HostChart;
