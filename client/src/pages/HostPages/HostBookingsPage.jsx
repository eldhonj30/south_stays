import React, { useContext, useEffect, useState } from "react";
import axios from "axios"
import {UserContext} from "../../Contexts/UserContext"
import HostCalender from "../../components/HostComponents/HostCalender";
import PlaceImage from "../../components/UserComponents/PlaceImage";
import { Link } from "react-router-dom";


const HostBookingsPage = () => {

  const today = new Date().toISOString().split('T')[0];

  const [bookings,setBookings] = useState([])
  const [filterdbookings,setFilterdBookings] = useState([])
  const [date,setDate] = useState(today)

  const { host } = useContext(UserContext);

  useEffect(() => {
    axios.get('/host/bookings').then(({data}) => {
      setBookings([...data])
    })
     
  },[])

useEffect(() => {
  const filteredBookings = bookings.filter((booking) => {
    return new Date(booking.checkIn).toISOString().split("T")[0] === date;
  });

  setFilterdBookings([...filteredBookings]);
}, [bookings, date]);



  return (
    <div className="container mt-16 px-8 py-8">
      <div className="grid lg:grid-cols-[2fr_1fr] sm:grid-cols-2 gap-4">
        <div className="grid lg:grid-cols-1 gap-2">
          <h1 className="text-2xl font-bold mb-2">{date} Bookings</h1>
          {filterdbookings.length > 0 ? (
            filterdbookings.map((booking) => (
              <div
                key={booking.id}
                className="border bg-gray-300 rounded-xl p-4 flex justify-evenly items-center"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{booking.name}</h2>
                  <p>Guests: {booking.numberOfGuests}</p>
                  <p>
                    Check-in:{" "}
                    {new Date(booking.checkIn).toISOString().split("T")[0]}
                  </p>
                  <p>
                    Check-out:{" "}
                    {new Date(booking.checkOut).toISOString().split("T")[0]}
                  </p>
                  <p className="text-red-400 text-xl">{booking.status}</p>
                  <Link
                    to={`/host/message?id=${booking.user}&&name=${booking.name}`}
                  >
                    <button className="bg-green-500 m-2 ml-8 p-2 rounded-full text-lg">
                      Message{" "}
                    </button>
                  </Link>
                </div>
                <div className="flex items-center">
                  <h1 className="text-md font-bold mb-2">
                    {booking.place.title}
                  </h1>
                </div>
                <div className="w-64">
                  <PlaceImage place={booking.place} />
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-xl text-center font-bold mb-2">
              Not booking at all
            </h2>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Choose a day</h1>
          <HostCalender bookings={bookings} setDate={setDate} />
        </div>
      </div>
    </div>
  );
};

export default HostBookingsPage;
