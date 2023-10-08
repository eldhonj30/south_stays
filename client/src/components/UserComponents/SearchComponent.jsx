import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import SearchMap from "./SearchMap";
import axios from "axios";
import { toast } from "react-toastify";

function SearchComponent() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [map, setMap] = useState(false);
  const [calender, setCalender] = useState(false);
  const [loc, setLoc] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(0);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let currentDate = tomorrow.toISOString().split("T")[0];
  let selectedDate;
  if (checkIn) {
    selectedDate = new Date(checkIn).toISOString().split("T")[0];
  }

  // functions for search by location

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };
  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setLong(longitude);
    setLat(latitude);
    openMap();
  };

  const errorCallback = (error) => {
    console.error("Error getting location:", error);
    openMap();
  };

  const openMap = () => {
    setShow(false);
    setMap(true);
  };

  const closeMap = () => {
    setMap(false);
  };

  const getLocation = (data) => {
    if (!data) return;
    setLoc(data);
  };

  const search = async () => {
    if (!loc) return toast.error("select your location");
    const { data } = await axios.get(
      `/guest/search-place-location?lat=${loc.lat}&&long=${loc.lng}`
    );
    if (!data?.length) {
      toast.error("Oops ..! No Matching data");
    }
    navigate("/", { state: data });
    setLat(null);
    setLong(null);
    setLoc(null);
    closeMap();
  };

  // functions for search by date

  const openCalender = () => {
    setShow(false);
    setCalender(true);
  };
  const closeCalender = () => {
    setCalender(false);
  };

  const searchByDate = async () => {
    const { data } = await axios.get(
      `/guest/search-place-date?In=${checkIn}&&Out=${checkOut}`
    );
    if (!data?.length) {
      toast.error("Oops ..! No Matching data");
    }
    navigate("/", { state: data });

    setCheckIn("");
    setCheckOut("");
    closeCalender();
  };

  // functions for search by No of guest

  const searchByGuest = async () => {
    if (!guest) return toast.error("fill your guest number");
    const { data } = await axios.get(
      `/guest/search-place-guest?guest=${guest}`
    );
    if (!data?.length) {
      toast.error("Oops ..! No Matching data");
    }
    navigate("/", { state: data });
    setGuest(0);
    setShow(false);
  };
  return (
    <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
      <div onClick={requestLocation} className="hover:cursor-pointer">
        Anywhere
      </div>
      <div className="border-l border-gray-300"></div>
      <div onClick={openCalender} className="hover:cursor-pointer">
        Any Week
      </div>
      <div className="border-l border-gray-300"></div>
      <div onClick={() => setShow(true)} className="hover:cursor-pointer">
        Add guests
        {show && (
          <div className="absolute top-12 right-[580px]  bg-white shadow-md rounded-md p-5">
            <div className="flex justify-between mb-2">
              <div>No of guest :</div>
              <button
                onClickCapture={() => setShow(false)}
                className="text-lg p-1 font-bold bg-transparent"
              >
                Close
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              />
              <button
                onClick={searchByGuest}
                className="bg-primary text-white px-3  rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      {!show && (
        <button className="bg-primary text-white p-1 rounded-full pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      )}
      {/* modal for map */}
      <Modal open={map} onClose={closeMap} center>
        <SearchMap getLocation={getLocation} lat={lat} long={long} />
        <button
          onClick={search}
          className="p-2 mt-1 rounded-xl absolute bottom-6 right-16 bg-primary"
        >
          Search
        </button>
      </Modal>
      {/* modal for map */}

      {/* modal for calender */}
      <Modal open={calender} onClose={closeCalender} center>
        <div className="p-5">
          <h2 className="text-xl font-semibold">Select Dates</h2>
          <div className=" flex gap-5  py-3 px-4">
            <div className="text-lg font-semibold">Check in : </div>
            <input
              className="border border-black p-1 rounded-lg"
              type="date"
              value={checkIn}
              min={currentDate}
              onChange={(ev) => {
                setCheckIn(ev.target.value);
              }}
            />
          </div>
          <div className="flex gap-2 py-3 px-4 mb-3">
            <div className="text-lg font-semibold">Check out :</div>
            <input
              className="border border-black p-1 rounded-lg"
              type="date"
              value={checkOut}
              min={selectedDate}
              onChange={(ev) => {
                setCheckOut(ev.target.value);
              }}
            />
          </div>
          <button
            onClick={searchByDate}
            className="absolute bottom-2 right-5 p-2 rounded-md text-lg bg-primary"
          >
            Search
          </button>
        </div>
      </Modal>

      {/* modal for calender */}
    </div>
  );
}

export default SearchComponent;
