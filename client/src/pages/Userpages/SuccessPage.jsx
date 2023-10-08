import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const [id, setId] = useState("");
  const [bookingCreated, setBookingCreated] = useState(false);
  useEffect(() => {
    if (bookingCreated) return;
    bookThisPlace();
    setBookingCreated(true);
  }, []);
  async function bookThisPlace() {
    try {
      const savedData = localStorage.getItem("bookingData");
      let bookingData = JSON.parse(savedData);
      const response = await axios.post("/guest/bookings", {
        bookingData,
      });
      localStorage.clear();
      const bookingId = response.data;
      setId(bookingId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 mx-auto text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-4">Booking Successful!</h2>
        <p className="text-gray-700 mb-8">
          Thank you for your booking. We look forward to welcoming you.
        </p>
        <Link
          to={`/profile/bookings/${id}`}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
