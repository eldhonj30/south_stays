import React, { useEffect, useState } from "react";
import { Chart as chartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";

function ChartComponent() {
  const [income, setIncome] = useState([]);
  const [booking,setBooking] = useState([]);
  const [pieData,setPieData] = useState([])

  useEffect(() => {
    axios.get("/admin/dashboard/bargraph/income").then(({ data }) => {
      setIncome([...data]);
    });
    axios.get('/admin/dashboard/bargraph/booking').then(({data}) => {
      setBooking([...data])
    })
    axios.get("/admin/dashboard/piegraph/booking").then(({data}) => {
      setPieData([...data])
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
    labels: income.map((item) => getMonthName(item.month)),
    datasets: [
      {
        label: "Revenue",
        data: income.map((item) => item.price_10_percent_monthly),
        borderWidth: 1,
        barThickness: 30,
      },
      {
        label: "Bookings",
        data: booking.map((item) => item.count),
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

  const pieChartData = {
    labels: pieData.map((item) => item.place_name),
    datasets: [
      {
        label: "Count",
        data: pieData.map((item) => item.count),
        backgroundColor: ["rgba(43,63,229,0.8)", "rgba(250,192,19,0.8)","rgba(253,135,135,0.8)"],
        borderRadius:5,
      },
    ],
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-2">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="fond-bold text-xl mb-2">Monthly Income & Bookings</h2>
        <Bar data={chartData} options={options} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="fond-bold text-xl mb-2">Place wise Bookings</h2>
        <Doughnut data={pieChartData} />
      </div>
    </div>
  );
}

export default ChartComponent;
