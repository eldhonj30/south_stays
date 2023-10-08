import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddressLink from "../../components/UserComponents/AdressLink";
import PlaceGallery from "../../components/UserComponents/PlaceGallery";
import BookingDates from "../../components/UserComponents/BookingDates";

function BookingDetailsPage() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get("/guest/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => id === _id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  const handleCancel = (id) => {
    axios
      .put("/guest/cancel-booking", { id, status: "cancelled" })
      .then((response) => {
        if (response.data) {
          navigate("/profile/bookings");
        } else {
          toast.error("Cancelling time exceeded");
        }
      });
  };

  if (!booking) {
    return "";
  }
  let statusClass;
  if (booking.status === "booked") {
    statusClass = "text-green-800 text-2xl font-bold";
  } else {
    statusClass = "text-red-800 text-2xl font-bold";
  }
  return (
    <div className="my-8 px-8">
      <h1 className="text-2xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address} </AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl">Your booking information :</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="flex-col items-center gap-1">
          <h2 className="text-xl">Your payment information : </h2>
          <div className="flex gap-1">
            <p>Advance : ₹ {booking.price * 0.1}</p> |
            <p>Balance : ₹ {booking.price - booking.price * 0.1}</p>
          </div>
        </div>
        <div className={statusClass}>{booking.status}</div>
        {booking.status === "booked" && (
          <div>
            <button
              onClick={() => handleCancel(booking._id)}
              className="p-4 rounded-2xl flex gap-1 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cancel
            </button>
          </div>
        )}

        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-xl"> ₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}></PlaceGallery>
    </div>
  );
}

export default BookingDetailsPage;
