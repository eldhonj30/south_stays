import React, { useEffect, useState } from "react";
import axios from "axios";
import HostCalender from "../../components/HostComponents/HostCalender";
import PlaceImage from "../../components/UserComponents/PlaceImage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HostTable from "../../components/HostComponents/HostTable";

const HostBookingsPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [bookings, setBookings] = useState([]);
  const [filterdbookings, setFilterdBookings] = useState([]);
  const [date, setDate] = useState(today);
  const [table, setTable] = useState(false);
  const [rndr, setRndr] = useState(false);

  useEffect(() => {
    axios.get("/host/bookings").then(({ data }) => {
      setBookings([...data]);
    });
  }, [rndr]);

  useEffect(() => {
    const filteredBookings = bookings.filter((booking) => {
      return new Date(booking.checkIn).toISOString().split("T")[0] === date;
    });

    setFilterdBookings([...filteredBookings]);
  }, [bookings, date]);

  const cnfrmCheckout = async (id) => {
    const { data } = await axios.post("/host/confirm-checkout", { id });
    setRndr((prev) => !prev);
    if (data) toast.success(data.message);
  };

  return (
    <div className="container mt-16 px-8 py-8">
      <div className="absolute top-16 right-5 mt-5">
        <input
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          value={table}
          onChange={() => setTable(!table)}
        />
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="flexSwitchCheckDefault"
        >
          Table View
        </label>
      </div>
      {table ? (
        <HostTable bookings={bookings} setRndr={setRndr} />
      ) : (
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
                      <button className="bg-green-500 m-1 px-3 py-2 rounded-full text-lg">
                        Message{" "}
                      </button>
                    </Link>
                    {booking.status === "booked" && (
                      <button
                        onClick={() => cnfrmCheckout(booking._id)}
                        className="bg-blue-500 p-2 rounded-full text-lg"
                      >
                        Checked Out
                      </button>
                    )}
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
                No booking at all
              </h2>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Choose a day</h1>
            <HostCalender bookings={bookings} setDate={setDate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostBookingsPage;
