import React, { useEffect, useState } from "react";
import { Chart as chartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";

function ChartComponent() {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    axios.get("/admin/dashboard/bargraph").then(({ data }) => {
      setBarData([...data]);
    });
  }, []);

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
    labels: barData.map((item) => getMonthName(item.month)),
    datasets: [
      {
        label: "Revenue",
        data: barData.map((item) => item.price_10_percent_monthly),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
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
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-2">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="fond-bold text-xl">Monthly Income</h2>
        <Bar data={chartData} options={options} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">55</div>
    </div>
  );
}

export default ChartComponent;
