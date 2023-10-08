import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AddressLink from "../../components/UserComponents/AdressLink";
import PlaceGallery from "../../components/UserComponents/PlaceGallery";
import BookingWidget from "../../components/UserComponents/BookingWidget";
import Calendar from "../../components/UserComponents/Calendar";
import LoadingSpinner from "../../components/LoadingSpinner";

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [bookings, setBookings] = useState([]);
  const [childState, setChildState] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/guest/place-details/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [place]);
  if (!place) {
    return <LoadingSpinner />;
  }
  useEffect(() => {
    axios
      .get(`/guest/booked-dates?place=${id}`)
      .then(({ data }) => setBookings([...data]))
      .catch((error) => console.error("Error:", error));
  }, []);

  const toparent = (newState) => {
    setChildState(newState);
  };
  return (
    <div className="mt-4 bg-gray-100 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <div>
        <AddressLink>{place.address}</AddressLink>

        <PlaceGallery place={place} toparent={toparent} />
      </div>

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[1fr_1fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        {childState ? (
          <div>
            <Calendar place={bookings} />
          </div>
        ) : null}
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white px-8 py-8 border-t">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
          <div className="mt-2">
            {place.owner && (
              <Link
                to={`/message?id=${place.owner._id}&&name=${place.owner.name}`}
              >
                <span className="text-lg text-blue-500 ">
                  Lets Meet Your Host ?
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
