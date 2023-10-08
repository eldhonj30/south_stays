import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function HostTable({ bookings, setRndr }) {
  useEffect(() => {
    if (!bookings?.length > 0) toast.error("No bookings recieved yet");
  }, []);

  const cnfrmCheckout = async (id) => {
    const { data } = await axios.post("/host/confirm-checkout", { id });
    setRndr((prev) => !prev);
    if (data) toast.success(data.message);
  };
  return (
    <div className="flex flex-col">
      {bookings?.length > 0 && (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Sl.No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Place
                    </th>
                    <th scope="col" className="px-6 py-4">
                      No. of Guest
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Check-In
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Check-Out
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {booking.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {booking.place.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {booking.numberOfGuests}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {" "}
                        {new Date(booking.checkIn).toISOString().split("T")[0]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {" "}
                        {new Date(booking.checkOut).toISOString().split("T")[0]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {booking.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          to={`/host/message?id=${booking.user}&&name=${booking.name}`}
                        >
                          <button className="bg-green-500 m-1 px-3 py-2 rounded-full ">
                            Message{" "}
                          </button>
                        </Link>
                        {booking.status === "booked" && (
                          <button
                            onClick={() => cnfrmCheckout(booking._id)}
                            className="bg-blue-500 p-2 rounded-full "
                          >
                            Checked Out
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HostTable;
