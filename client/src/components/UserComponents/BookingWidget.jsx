import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext.jsx";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const pKey = import.meta.env.VITE_REACT_APP_STRIPE;

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let currentDate = tomorrow.toISOString().split("T")[0];
  let selectedDate;
  if (checkIn) {
    selectedDate = new Date(checkIn).toISOString().split("T")[0];
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

    function validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    }

  const availability = async () => {
    if (!user) {
      toast.error("Please login first");
      return navigate("/login");
    }

    if (numberOfGuests > place.maxGuests || numberOfGuests <= 0) {
      return toast.error(`only ${place.maxGuests} guests are allowed`);
    }

    if (numberOfGuests == "" || name.trim() === "" || phone === "") {
      return toast.error("please fill out all fields");
    }

    if(!validatePhoneNumber(phone)) return toast.error("Invalid phone number")
  
    const { data } = await axios.post("/guest/place-available", {
      checkIn,
      checkOut,
      place: place._id,
    });
    if (data) {
      payment();
    } else {
      toast.error("oops ..! Sorry,Try another days");
    }
  };

  async function payment() {
    const bookingData = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      user: user._id,
      owner: place.owner,
      price: numberOfNights * place.price,
    };
    const stringData = JSON.stringify(bookingData);

    localStorage.setItem("bookingData", stringData);
    const stripe = await loadStripe(pKey);

    const { data } = await axios.post("/guest/create-checkout-session", {
      name,
      price: numberOfNights * place.price,
      place: place._id,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    if (result?.error) {
      toast.error(result.error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              min={currentDate}
              onChange={(ev) => {
                setCheckIn(ev.target.value);
              }}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              min={selectedDate}
              onChange={(ev) => {
                setCheckOut(ev.target.value);
              }}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          {numberOfNights > 0 && (
            <div className="flex justify-around">
              <h2 className="text-xl font-bold p-2">
                Selected days : {numberOfNights}
              </h2>
              {/* <button onClick={availability} className={buttonClass}>Check Availability</button> */}
            </div>
          )}
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            max={place.maxGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            required
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              required
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value.trim())}
              required
            />
          </div>
        )}
      </div>
      {numberOfNights > 0 && (
        <div>
          <h3 className="text-orange-400 text-center">
            Note :You have to pay booking charge of ₹{" "}
            {numberOfNights * place.price * 0.1}, which is non-refundable
          </h3>
        </div>
      )}

      <button onClick={availability} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ₹ {numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
